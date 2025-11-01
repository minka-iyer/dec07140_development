document.querySelectorAll(".learn-more").forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.story);
        modal.style.display = "block";
    });
});

document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        closeBtn.closest(".modal").style.display = "none";
    });
});

window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
});
// === HOW THIS WORKS TOGGLE ===
const howBtn = document.getElementById("how-this-works-btn");
const infoBox = document.getElementById("how-this-works-box");

if (howBtn && infoBox) {
    howBtn.addEventListener("click", () => {
        const isVisible = infoBox.classList.contains("show");
        infoBox.classList.toggle("show", !isVisible);
        infoBox.classList.toggle("hidden", isVisible);
        howBtn.textContent = isVisible ? "How This Works" : "Hide Info";
    });
}
