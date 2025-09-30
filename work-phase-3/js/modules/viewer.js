const initGalleryViewer = () => {
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewer-img");
    const viewerCaption = document.getElementById("viewer-caption");
    const closeBtn = document.getElementById("close-viewer");

    // Click on gallery image to open viewer
    document.querySelectorAll(".gallery img").forEach((img) => {
        img.addEventListener("click", () => {
            viewerImg.src = img.src;
            viewerImg.alt = img.alt;
            viewerCaption.textContent = img.alt;

            viewer.classList.add("open");
            viewer.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden"; // prevent background scroll
        });
    });

    // Close button hides the viewer
    closeBtn.addEventListener("click", () => {
        closeViewer();
    });

    // Close viewer when clicking outside content (background of aside)
    viewer.addEventListener("click", (e) => {
        if (e.target === viewer) {
            closeViewer();
        }
    });

    // Close viewer when pressing ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && viewer.classList.contains("open")) {
            closeViewer();
        }
    });

    // Shared close function
    function closeViewer() {
        viewer.classList.remove("open");
        viewer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto"; // re-enable scroll
    }
};

export { initGalleryViewer };
