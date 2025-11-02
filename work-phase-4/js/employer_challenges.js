// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // === HOW THIS WORKS TOGGLE ===
    const howBtn = document.getElementById("how-this-works-btn");
    const infoBox = document.getElementById("how-this-works-box");

    if (howBtn && infoBox) {
        howBtn.addEventListener("click", () => {
            infoBox.classList.toggle("hidden");
            infoBox.classList.toggle("show");
        });
    }

    // === MODALS ===
    const learnButtons = document.querySelectorAll(".learn-more");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    // Open modal on "Learn more"
    learnButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const storyId = btn.getAttribute("data-story");
            const modal = document.getElementById(storyId);
            if (modal) modal.style.display = "block";
        });
    });

    // Close modal on "×" click
    closeButtons.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            closeBtn.closest(".modal").style.display = "none";
        });
    });

    // Close modal on outside click
    window.addEventListener("click", (e) => {
        modals.forEach((modal) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
