// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Create hamburger button if it doesn't exist
    const nav = document.querySelector('#nav-desktop');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        // Check if hamburger already exists
        let hamburger = nav.querySelector('.hamburger');
        
        if (!hamburger) {
            // Create hamburger button
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            // Insert hamburger before nav-links
            nav.appendChild(hamburger);
        }
        
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }
        
        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Close menu function
        function closeMenu() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Hamburger click event
        hamburger.addEventListener('click', toggleMenu);
        
        // Overlay click event (close menu when clicking outside)
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when clicking a nav link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu on window resize if it's open and we're on desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});