export function initButtons() {
    // Grab all button-containers
    const containers = document.querySelectorAll(".button-container");

    containers.forEach((container) => {
        const button = container.querySelector("button");
        const dialog = container.querySelector(".annotation");
        const closeBtn = container.querySelector(".close-dialog");

        if (button && dialog && closeBtn) {
            // Show dialog
            button.addEventListener("click", () => {
                dialog.style.display = "block";
            });

            // Hide dialog
            closeBtn.addEventListener("click", () => {
                dialog.style.display = "none";
            });
        }
    });
}
