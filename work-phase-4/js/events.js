// ============================================
// FIND AN EVENT PAGE INTERACTIVITY
// ============================================

// ===== 1️⃣ FILTER BUTTONS =====
const filterButtons = document.querySelectorAll(".filter-btn");
const eventSections = document.querySelectorAll(".event-section");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Toggle active visual state
        button.classList.toggle("active");

        // Get all active filters
        const activeFilters = [...filterButtons]
            .filter((btn) => btn.classList.contains("active"))
            .map((btn) => btn.dataset.filter);

        // Show/hide event sections
        eventSections.forEach((section) => {
            const category = section.dataset.category;
            if (
                activeFilters.length === 0 ||
                activeFilters.includes(category)
            ) {
                section.style.display = "block";
                section.classList.add("fade-in");
            } else {
                section.style.display = "none";
            }
        });
    });
});

// ===== 2️⃣ SEARCH BAR FUNCTIONALITY =====
const searchInput = document.querySelector(".search-sort input");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        document.querySelectorAll(".event-card").forEach((card) => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(query) ? "block" : "none";
        });
    });
}

// ===== 3️⃣ MODAL (POPUP) FUNCTIONALITY =====

// Create the modal dynamically
const modal = document.createElement("div");
modal.classList.add("event-modal");
modal.innerHTML = `
    <div class="modal-content">
        <button class="close-modal" aria-label="Close">&times;</button>
        <h2 class="modal-title"></h2>
        <p class="modal-location"></p>
        <div class="modal-description"></div>
        <a href="#" class="modal-link" target="_blank" rel="noopener noreferrer"></a>
    </div>
`;
document.body.appendChild(modal);

// Cache elements
const modalContent = modal.querySelector(".modal-content");
const closeModal = modal.querySelector(".close-modal");
const modalTitle = modal.querySelector(".modal-title");
const modalLocation = modal.querySelector(".modal-location");
const modalDescription = modal.querySelector(".modal-description");
const modalLink = modal.querySelector(".modal-link");

// Open modal on event card click
const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach((card) => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h4")?.innerText || "Untitled Event";
        const location =
            card.querySelector("span")?.innerText || "Location TBA";
        const description = card.querySelector("p")?.innerText || "";
        const image = card.querySelector("img")?.src || "";
        const link = card.dataset.link || "https://events.com/register";

        // Populate modal
        modalTitle.textContent = title;
        modalLocation.textContent = location;
        modalDescription.innerHTML = `
        <p>${description}</p>
        ${image ? `<img src="${image}" alt="${title}" class="modal-img" />` : ""}
    `;
        modalLink.textContent = link.replace("https://", "");
        modalLink.href = link;

        // Open modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// Close modal (✕ or background)
closeModal.addEventListener("click", () => closeEventModal());
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEventModal();
});

function closeEventModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// ===== 4️⃣ FADE-IN ANIMATION =====
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
