export async function getData() {
    try {
        const response = await fetch("http://localhost:3000/community");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const list = document.getElementById("community-list");

        // Clear existing cards (keep heading/intro)
        list.querySelectorAll(".community-card").forEach((el) => el.remove());

        // Render each entry
        data.forEach((entry) => {
            const card = document.createElement("div");
            card.classList.add("community-card");
            card.innerHTML = `
        ${
            entry.photo
                ? `<img src="${entry.photo}" alt="${entry.name}'s photo">`
                : ""
        }
        <h4>${entry.name}</h4>
        <small>${entry.email}</small>
        <p>${entry.message || "No message provided."}</p>
    `;
            list.appendChild(card);
        });
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}
