export function initColorWheel() {
    const circles = document.querySelectorAll(".color-circle");
    const infoBox = document.getElementById("color-info");

    circles.forEach((circle) => {
        circle.addEventListener("click", () => {
            // Collapse all other circles
            circles.forEach((c) => c.classList.remove("active"));

            // Expand the clicked circle
            circle.classList.add("active");

            // Update info box content
            infoBox.innerHTML = `
        <h3>${circle.dataset.label}</h3>
        <p><strong>HEX:</strong> ${circle.dataset.code}</p>
        <p><em>${circle.dataset.use}</em></p>
        `;

            // ✅ Show the info box (force it visible)
            infoBox.style.display = "block";
        });
    });
}
