// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all filter elements
    const eventTypeCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const locationSelect = document.querySelector('.filter-group select');
    const dateInput = document.querySelector('.filter-group input[type="date"]');
    const searchInput = document.querySelector('.search-sort input[type="text"]');
    const sortSelect = document.querySelector('.search-sort select');
    
    // Get all event cards and sections
    const eventSections = document.querySelectorAll('.event-section');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Add event listeners
    eventTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });
    
    if (locationSelect) {
        locationSelect.addEventListener('change', filterEvents);
    }
    
    if (dateInput) {
        dateInput.addEventListener('change', filterEvents);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortEvents);
    }
    
    // Main filter function
    function filterEvents() {
        // Get selected event types
        const selectedTypes = Array.from(eventTypeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.textContent.trim().toLowerCase());
        
        // Get selected location
        const selectedLocation = locationSelect ? locationSelect.value : 'All Locations';
        
        // Get search query
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Get selected date
        const selectedDate = dateInput ? dateInput.value : '';
        
        // Filter each section
        eventSections.forEach(section => {
            const sectionType = section.querySelector('h3').textContent.trim().toLowerCase();
            const cards = section.querySelectorAll('.event-card');
            let visibleCards = 0;
            
            // Check if this section type is selected (or if no types are selected, show all)
            const showSection = selectedTypes.length === 0 || selectedTypes.includes(sectionType);
            
            if (showSection) {
                cards.forEach(card => {
                    const title = card.querySelector('h4').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const location = card.querySelector('span').textContent.toLowerCase();
                    
                    // Check if card matches all filters
                    let showCard = true;
                    
                    // Search filter
                    if (searchQuery && !title.includes(searchQuery) && !description.includes(searchQuery)) {
                        showCard = false;
                    }
                    
                    // Location filter
                    if (selectedLocation !== 'All Locations' && !location.includes(selectedLocation.toLowerCase())) {
                        showCard = false;
                    }
                    
                    // Show or hide card
                    if (showCard) {
                        card.style.display = 'block';
                        visibleCards++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show/hide section based on visible cards
                section.style.display = visibleCards > 0 ? 'block' : 'none';
            } else {
                section.style.display = 'none';
            }
        });
        
        // Show message if no results
        checkNoResults();
    }
    
    // Sort events function
    function sortEvents() {
        if (!sortSelect) return;
        
        const sortValue = sortSelect.value;
        
        eventSections.forEach(section => {
            const grid = section.querySelector('.event-grid');
            const cards = Array.from(grid.querySelectorAll('.event-card'));
            
            // Sort based on selection
            cards.sort((a, b) => {
                if (sortValue === 'Most Popular') {
                    // You could add a data-popularity attribute to cards
                    // For now, just reverse the order as a demo
                    return 0; // Keep original order for demo
                } else if (sortValue === 'Closing Soon') {
                    // You could add a data-date attribute to cards
                    return 0; // Keep original order for demo
                } else {
                    // Newest - keep original order
                    return 0;
                }
            });
            
            // Re-append sorted cards
            cards.forEach(card => grid.appendChild(card));
        });
    }
    
    // Check if there are no results and show message
    function checkNoResults() {
        const visibleSections = Array.from(eventSections).filter(section => 
            section.style.display !== 'none'
        );
        
        // Remove any existing "no results" message
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // If no visible sections, show message
        if (visibleSections.length === 0) {
            const eventsContent = document.querySelector('.events-content');
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.style.cssText = `
                text-align: center;
                padding: 3rem;
                color: var(--secondary);
                font-size: 1.1rem;
                background: linear-gradient(135deg, #ffffff 0%, #f0f9fa 100%);
                border-radius: 0.618rem;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                margin-top: 2rem;
            `;
            message.innerHTML = `
                <h3 style="font-family: 'Michroma', sans-serif; color: var(--primary); margin-bottom: 1rem;">No Events Found</h3>
                <p>Try adjusting your filters or search terms.</p>
            `;
            eventsContent.appendChild(message);
        }
    }
    
    // Add smooth scroll to top when filters change
    function smoothScrollToResults() {
        const eventsContent = document.querySelector('.events-content');
        if (eventsContent) {
            eventsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Optional: Add event listener to scroll on filter change
    eventTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            setTimeout(smoothScrollToResults, 100);
        });
    });
});

// Optional: Add labels to checkboxes if they don't exist
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        // Map checkbox labels to section names
        const labelText = checkbox.parentElement.textContent.trim();
        checkbox.dataset.eventType = labelText.toLowerCase();
    });
});