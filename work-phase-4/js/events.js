// ============================================
// FIND AN EVENT PAGE INTERACTIVITY
// ============================================

// Event data with dates
const eventData = {
    "Social Soccer Match": { date: "2025-11-08", category: "sports" },
    "Running Club Meetup": { date: "2025-11-15", category: "sports" },
    "Resume Writing Workshop": { date: "2025-11-12", category: "professional" },
    "Industry Networking Night": { date: "2025-11-20", category: "professional" },
    "Sunrise Yoga Sessions": { date: "2025-11-10", category: "wellness" },
    "Mindfulness & Meditation": { date: "2025-11-18", category: "wellness" },
    "Student Art Exhibition": { date: "2025-11-25", category: "cultural" },
    "International Food Festival": { date: "2025-12-05", category: "cultural" }
};

// ===== 1️⃣ FILTER BUTTONS =====
const filterButtons = document.querySelectorAll(".filter-btn");
const eventSections = document.querySelectorAll(".event-section");
const dateStartInput = document.querySelector('.filter-group input[name="date-start"]');
const dateEndInput = document.querySelector('.filter-group input[name="date-end"]');
const locationSelect = document.querySelector('.filter-group select');

let activeFilters = {
    categories: [],
    dateStart: null,
    dateEnd: null,
    location: 'All Locations'
};

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        const filter = button.dataset.filter;
        if (button.classList.contains("active")) {
            if (!activeFilters.categories.includes(filter)) {
                activeFilters.categories.push(filter);
            }
        } else {
            activeFilters.categories = activeFilters.categories.filter(f => f !== filter);
        }

        applyFilters();
    });
});

// ===== DATE RANGE FILTER =====
if (dateStartInput) {
    dateStartInput.addEventListener("change", () => {
        activeFilters.dateStart = dateStartInput.value;
        console.log('Start date selected:', activeFilters.dateStart);
        
        // Only apply filters if both dates are selected
        if (activeFilters.dateStart && activeFilters.dateEnd) {
            applyFilters();
        }
    });
}

if (dateEndInput) {
    dateEndInput.addEventListener("change", () => {
        activeFilters.dateEnd = dateEndInput.value;
        console.log('End date selected:', activeFilters.dateEnd);
        
        // Only apply filters if both dates are selected
        if (activeFilters.dateStart && activeFilters.dateEnd) {
            applyFilters();
        }
    });
}

// ===== LOCATION FILTER =====
if (locationSelect) {
    locationSelect.addEventListener("change", () => {
        activeFilters.location = locationSelect.value;
        applyFilters();
    });
}

// ===== APPLY ALL FILTERS =====
function applyFilters() {
    const allCards = document.querySelectorAll(".event-card");
    let hasDateFilter = activeFilters.dateStart && activeFilters.dateEnd;
    
    console.log('Applying filters:', activeFilters);
    
    allCards.forEach((card) => {
        const title = card.querySelector("h4")?.innerText || "";
        const locationText = card.querySelector(".location-pin")?.innerText || "";
        const eventInfo = eventData[title];
        
        let shouldShow = true;
        
        // Filter by category
        if (activeFilters.categories.length > 0) {
            const cardSection = card.closest('.event-section');
            const category = cardSection?.dataset.category;
            if (!activeFilters.categories.includes(category)) {
                shouldShow = false;
            }
        }
        
        // Filter by date range (only if both dates are selected)
        if (hasDateFilter && eventInfo && eventInfo.date) {
            const eventDate = eventInfo.date;
            
            console.log(`Checking ${title}: ${eventDate} between ${activeFilters.dateStart} and ${activeFilters.dateEnd}`);
            
            // Event must be within the range (inclusive)
            if (eventDate < activeFilters.dateStart || eventDate > activeFilters.dateEnd) {
                shouldShow = false;
                console.log(`  -> Hidden (outside date range)`);
            } else {
                console.log(`  -> Shown (within date range)`);
            }
        }
        
        // Filter by location
        if (activeFilters.location && activeFilters.location !== 'All Locations') {
            if (!locationText.includes(activeFilters.location)) {
                shouldShow = false;
            }
        }
        
        card.style.display = shouldShow ? "block" : "none";
    });
    
    // Show/hide sections based on visible cards
    eventSections.forEach((section) => {
        const visibleCards = Array.from(section.querySelectorAll('.event-card')).filter(
            card => card.style.display !== 'none'
        );
        section.style.display = visibleCards.length > 0 ? "block" : "none";
    });
}

// ===== 2️⃣ SEARCH BAR FUNCTIONALITY =====
const searchInput = document.querySelector(".search-sort input");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        document.querySelectorAll(".event-card").forEach((card) => {
            const text = card.innerText.toLowerCase();
            const shouldShow = text.includes(query);
            card.style.display = shouldShow ? "block" : "none";
        });
        
        eventSections.forEach((section) => {
            const visibleCards = Array.from(section.querySelectorAll('.event-card')).filter(
                card => card.style.display !== 'none'
            );
            section.style.display = visibleCards.length > 0 ? "block" : "none";
        });
    });
}

// ===== 3️⃣ SORT FUNCTIONALITY =====
const sortSelect = document.querySelector(".search-sort select");

if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        const sortType = sortSelect.value;
        sortEvents(sortType);
    });
}

function sortEvents(sortType) {
    eventSections.forEach(section => {
        const grid = section.querySelector('.event-grid');
        const cards = Array.from(grid.querySelectorAll('.event-card'));
        
        cards.sort((a, b) => {
            const titleA = a.querySelector('h4')?.innerText || "";
            const titleB = b.querySelector('h4')?.innerText || "";
            const dateA = eventData[titleA]?.date || "";
            const dateB = eventData[titleB]?.date || "";
            
            switch(sortType) {
                case 'Sort by: Newest':
                    return dateB.localeCompare(dateA);
                case 'Most Popular':
                    return 0;
                case 'Closing Soon':
                    return dateA.localeCompare(dateB);
                default:
                    return 0;
            }
        });
        
        cards.forEach(card => grid.appendChild(card));
    });
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ===== 4️⃣ MODAL (POPUP) FUNCTIONALITY =====
const modal = document.createElement("div");
modal.classList.add("event-modal");
modal.innerHTML = `
    <div class="modal-content">
        <button class="close-modal" aria-label="Close">&times;</button>
        <h2 class="modal-title"></h2>
        <p class="modal-date"></p>
        <p class="modal-location"></p>
        <div class="modal-description"></div>
        <a href="#" class="modal-link" target="_blank" rel="noopener noreferrer"></a>
    </div>
`;
document.body.appendChild(modal);

const modalContent = modal.querySelector(".modal-content");
const closeModalBtn = modal.querySelector(".close-modal");
const modalTitle = modal.querySelector(".modal-title");
const modalDate = modal.querySelector(".modal-date");
const modalLocation = modal.querySelector(".modal-location");
const modalDescription = modal.querySelector(".modal-description");
const modalLink = modal.querySelector(".modal-link");

// Open modal on event card click
const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach((card) => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h4")?.innerText || "Untitled Event";
        
        // Get location - look for the span with the pin emoji
        const locationSpan = card.querySelector(".location-pin");
        const location = locationSpan ? locationSpan.innerText : "Location TBA";
        
        console.log('Card clicked:', title);
        console.log('Location found:', location);
        
        const description = card.querySelector("p")?.innerText || "";
        const image = card.querySelector("img")?.src || "";
        const link = card.dataset.link || "https://events.com/register";
        
        // Get date from eventData
        const eventInfo = eventData[title];
        const formattedDate = eventInfo ? formatDate(eventInfo.date) : "";

        modalTitle.textContent = title;
        modalDate.textContent = formattedDate ? `📅 ${formattedDate}` : "";
        modalLocation.textContent = location;
        modalDescription.innerHTML = `
            <p>${description}</p>
            ${image ? `<img src="${image}" alt="${title}" class="modal-img" />` : ""}
        `;
        modalLink.textContent = "Register Now";
        modalLink.href = link;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

closeModalBtn.addEventListener("click", () => closeEventModal());
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEventModal();
});

function closeEventModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// ===== 5️⃣ FADE-IN ANIMATION =====
const style = document.createElement("style");
style.textContent = `
.fade-in {
    animation: fadeIn 0.4s ease forwards;
    }
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);