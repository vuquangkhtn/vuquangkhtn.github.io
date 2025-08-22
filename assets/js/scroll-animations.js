// Scroll-triggered animations for timeline items
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'in-view' class when element enters viewport
                entry.target.classList.add('in-view');
            }
        });
    }, {
        // Trigger when 30% of the element is visible
        threshold: 0.3,
        // Start observing 50px before the element enters viewport
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all timeline_right elements
    const timelineRightElements = document.querySelectorAll('.timeline_right');
    timelineRightElements.forEach(element => {
        observer.observe(element);
    });
});