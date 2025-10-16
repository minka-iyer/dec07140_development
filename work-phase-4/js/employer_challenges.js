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
