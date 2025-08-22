const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Check if watch mode is enabled
const isWatch = process.argv.includes('--watch');

// Build configuration
const buildConfig = {
  entryPoints: [
    'assets/js/scroll-animations.js'
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  outdir: 'dist/js',
  format: 'iife',
  platform: 'browser'
};

// CSS bundling function
function bundleCSS() {
  const cssFiles = [
    'assets/css/relume-timeline-cloneable.webflow.dee96ca0d.css',
    'assets/css/trending-colors-2024.css',
    'assets/css/mobile-responsive-fixes.css'
  ];
  
  let bundledCSS = '';
  
  cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
      bundledCSS += fs.readFileSync(file, 'utf8') + '\n';
    }
  });
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  if (!fs.existsSync('dist/css')) {
    fs.mkdirSync('dist/css', { recursive: true });
  }
  
  // Write bundled CSS
  fs.writeFileSync('dist/css/bundle.css', bundledCSS);
  console.log('✅ CSS bundled successfully');
}

// Build function
async function build() {
  try {
    // Bundle CSS
    bundleCSS();
    
    // Bundle JavaScript
    if (isWatch) {
      const ctx = await esbuild.context(buildConfig);
      await ctx.watch();
      console.log('👀 Watching for changes...');
    } else {
      await esbuild.build(buildConfig);
      console.log('✅ JavaScript bundled successfully');
    }
    
    console.log('🚀 Build completed!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();

// Handle watch mode cleanup
if (isWatch) {
  process.on('SIGINT', () => {
    console.log('\n👋 Build watcher stopped');
    process.exit(0);
  });
}