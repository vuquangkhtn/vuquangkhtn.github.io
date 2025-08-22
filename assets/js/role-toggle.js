document.addEventListener('DOMContentLoaded', function() {
    const roleElement = document.querySelector('.role-toggle');
    if (!roleElement) return;
    
    const roles = ['Software Engineer', 'Web Developer'];
    let currentRoleIndex = 0;
    
    function toggleRole() {
        // Add fade-out class
        roleElement.classList.add('fade-out');
        
        setTimeout(() => {
            // Change text after fade-out
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleElement.textContent = roles[currentRoleIndex];
            
            // Remove fade-out and add fade-in
            roleElement.classList.remove('fade-out');
            roleElement.classList.add('fade-in');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                roleElement.classList.remove('fade-in');
            }, 1000);
        }, 300);
    }
    
    // Start the toggle cycle
    setInterval(toggleRole, 2000); // Change every 5 seconds
});