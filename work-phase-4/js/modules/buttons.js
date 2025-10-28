export function initButtons() {
    const containers = document.querySelectorAll(".button-container");

    containers.forEach((container) => {
        const button = container.querySelector("button");
        const dialog = container.querySelector(".annotation");
        const closeBtn = container.querySelector(".close-dialog");

        if (button && dialog && closeBtn) {
            button.addEventListener("click", () => {
                dialog.classList.add("visible");
            });

            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                dialog.classList.remove("visible");
            });
        }
    });
}