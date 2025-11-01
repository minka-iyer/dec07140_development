// === BADGE INFO TOGGLE ===
const badgeBtn = document.getElementById("badge-info-btn");
const badgeBox = document.getElementById("badge-info-box");

if (badgeBtn && badgeBox) {
    badgeBtn.addEventListener("click", () => {
        const isVisible = badgeBox.classList.contains("show");
        badgeBox.classList.toggle("show", !isVisible);
        badgeBox.classList.toggle("hidden", isVisible);
        badgeBtn.textContent = isVisible
            ? "What do these badges mean?"
            : "Hide Info";
    });
}
