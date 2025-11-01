document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.querySelector(".search-sort input");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const applyBtn = document.getElementById("filter-date-btn");
    const eventCards = document.querySelectorAll(".event-card");
    const modal = document.createElement("div");

    // === CREATE EVENT MODAL ===
    modal.classList.add("event-modal");
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h3 class="modal-title"></h3>
            <span class="modal-date"></span>
            <span class="modal-location"></span>
            <p class="modal-description"></p>
            <a class="modal-link" target="_blank">Join Event</a>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModalBtn = modal.querySelector(".close-modal");
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    // === CATEGORY FILTER ===
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            document.querySelectorAll(".event-section").forEach((section) => {
                if (filter === "all" || section.dataset.category === filter) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
        });
    });

    // === SEARCH FILTER ===
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        eventCards.forEach((card) => {
            const title = card.querySelector("h4").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // === DATE RANGE FILTER ===
    applyBtn.addEventListener("click", () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (isNaN(startDate) || isNaN(endDate)) {
            alert("Please select both start and end dates.");
            return;
        }

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        eventCards.forEach((card) => {
            const dateText = card.querySelector(".event-date").textContent;
            const match = dateText.match(/([A-Za-z]+) (\d{1,2}), (\d{4})/);

            if (match) {
                const cardDate = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
                if (cardDate >= startDate && cardDate <= endDate) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
    });

    // === EVENT CARD CLICK -> OPEN MODAL ===
    eventCards.forEach((card) => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h4").textContent;
            const date = card.querySelector(".event-date").textContent;
            const description = card.querySelector("p").textContent;
            const location = card.querySelector(".location-pin").textContent;
            const link = card.dataset.link;
            const imgSrc = card.querySelector("img").src;

            modal.querySelector(".modal-title").textContent = title;
            modal.querySelector(".modal-date").textContent = date;
            modal.querySelector(".modal-location").textContent = location;
            modal.querySelector(".modal-description").innerHTML = `
                ${description}<br><img src="${imgSrc}" alt="${title}" class="modal-img">
            `;
            modal.querySelector(".modal-link").href = link;
            modal.classList.add("active");
        });
    });
});
