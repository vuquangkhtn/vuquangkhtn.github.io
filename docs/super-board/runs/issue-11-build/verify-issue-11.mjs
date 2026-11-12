// super-board builder verification for issue #11 (prototype-deck slider + seal)
// Drives the cached playwright chromium-headless-shell over raw CDP (Node 22 built-in WebSocket).
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SHELL = '/Users/gauwan/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const PAGE = 'file:///Users/gauwan/Codespaces/vuquangkhtn.github.io/.claude/worktrees/issue-11-build/docs/wayfinder/journeyman-folio/prototype-deck.html';
const SHOTS = '/tmp/sb11-verify';

const prof = mkdtempSync(join(tmpdir(), 'sb11-profile-'));
const chrome = spawn(SHELL, [
  '--headless', '--remote-debugging-port=0', `--user-data-dir=${prof}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', 'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] });

const wsUrl = await new Promise((res, rej) => {
  let buf = '';
  const t = setTimeout(() => rej(new Error('no devtools line: ' + buf)), 15000);
  chrome.stderr.on('data', (d) => {
    buf += d.toString();
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearTimeout(t); res(m[1]); }
  });
});
console.log('CDP:', wsUrl);

const list = await (await fetch(wsUrl.replace('ws://', 'http://').replace(/\/devtools\/.*/, '') + '/json/list')).json();
const target = list.find(t => t.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0; const pending = new Map();
const events = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(msg.method + ' ' + JSON.stringify(msg.error))) : res(msg.result); }
  else if (msg.method) events.push(msg);
};
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitEvent = (method, timeout = 15000) => new Promise((res, rej) => {
  const t0 = Date.now();
  (function poll() { const i = events.findIndex(e => e.method === method); if (i >= 0) { res(events.splice(i, 1)[0]); } else if (Date.now() - t0 > timeout) rej(new Error('timeout ' + method)); else setTimeout(poll, 40); })();
});
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

await send('Page.enable');
await send('Runtime.enable');

const results = {};
for (const width of [320, 390, 768, 1440]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: width < 700 });
  const nav = waitEvent('Page.loadEventFired');
  await send('Page.navigate', { url: PAGE });
  await nav; await sleep(400);

  // scroll the weave toy into view; wait for the section's play-once entrance to settle
  await evalJs(`(async () => {
    const sec = document.querySelector('#study');
    const toy = sec.querySelector('.toy');
    toy.scrollIntoView({ block: 'center' });
    await new Promise(res => {
      const iv = setInterval(() => {
        if (sec.classList.contains('in')) { clearInterval(iv); setTimeout(res, 800); }
      }, 50);
    });
    return sec.classList.contains('in');
  })()`);

  // trigger the seal celebration: press all 32 weave tiles (4 stripes)
  const sealInfo = await evalJs(`(async () => {
    const tiles = document.querySelectorAll('.weave button');
    tiles.forEach(t => t.click());
    await new Promise(r => setTimeout(r, 1800)); // sealslam delay .85s + .7s animation
    const toy = document.querySelector('#study .toy');
    const h4El = toy.querySelector('h4');
    const h4 = h4El.getBoundingClientRect();
    const rng = document.createRange(); rng.selectNodeContents(h4El);
    const tr = rng.getBoundingClientRect(); // union of the heading TEXT line boxes
    const sealEl = toy.querySelector('.seal');
    const cs = getComputedStyle(sealEl);
    const s = sealEl.getBoundingClientRect();
    const ix = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    return {
      done: toy.classList.contains('done'),
      sealCount: toy.querySelectorAll('.seal').length,
      sealComputed: { top: cs.top, width: cs.width, height: cs.height },
      h4Box: { top: h4.top, bottom: h4.bottom, left: h4.left, right: h4.right, height: h4.height },
      h4Text: { top: tr.top, bottom: tr.bottom, left: tr.left, right: tr.right },
      sealRect: { top: s.top, bottom: s.bottom, left: s.left, right: s.right, width: s.width },
      intersectsH4Box: ix(s, h4),
      intersectsH4Text: ix(s, tr),
    };
  })()`);

  // keyboard: focus the slider, two real ArrowRight key events via CDP input domain
  await evalJs(`(async () => {
    document.querySelector('#codelink .toy').scrollIntoView({ block: 'center' });
    await new Promise(res => {
      const sec = document.querySelector('#codelink');
      const iv = setInterval(() => {
        if (sec.classList.contains('in')) { clearInterval(iv); setTimeout(res, 600); }
      }, 50);
    });
    document.getElementById('cov').focus();
    return document.activeElement.id;
  })()`);
  for (let k = 0; k < 2; k++) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
  }
  await sleep(150);
  const kb = await evalJs(`({ value: document.getElementById('cov').value, out: document.getElementById('covout').textContent })`);

  // drag: real mouse press-move-release across the slider track (slider now scrolled into view)
  const r = await evalJs(`(() => { const b = document.getElementById('cov').getBoundingClientRect(); return { h: b.height, x: b.left, y: b.top, w: b.width }; })()`);
  const y = r.y + r.h / 2;
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: r.x + 5, y, button: 'left', clickCount: 1 });
  for (let i = 1; i <= 8; i++) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x + 5 + ((r.w - 10) * i) / 8, y, button: 'left' });
    await sleep(30);
  }
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: r.x + r.w - 5, y, button: 'left', clickCount: 1 });
  await sleep(1200); // confetti burst animation runs 1s
  const drag = await evalJs(`(() => {
    const cov = document.getElementById('cov');
    return { value: cov.value, out: document.getElementById('covout').textContent,
      done: cov.closest('.toy').classList.contains('done'), dashes: cov.closest('.toy').querySelectorAll('.dash').length };
  })()`);

  results[width] = { sealInfo, kb, drag, inputH: r.h };
  if (width === 320 || width === 390) {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(SHOTS, `after-${width}.png`), Buffer.from(shot.data, 'base64'));
  }
  console.log(`--- ${width}px ---`);
  console.log(JSON.stringify({ sealInfo, kb, drag }, null, 1));
}

console.log('=== SUMMARY ===');
for (const [w, v] of Object.entries(results)) {
  console.log(w, 'inputH', v.inputH, '(≥24:', v.inputH >= 24 + ')',
    '| kb', v.kb.value, v.kb.out,
    '| drag→', v.drag.value, v.drag.out, 'done', v.drag.done, 'dashes', v.drag.dashes,
    '| seal h4box∩', v.sealInfo.intersectsH4Box, 'h4text∩', v.sealInfo.intersectsH4Text,
    '| sealCS', JSON.stringify(v.sealInfo.sealComputed));
}
chrome.kill();
process.exit(0);
