import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("postForm");
    const feedback = document.getElementById("form-feedback");
    const container = document.getElementById("stories-container");

    // --- POST form ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        feedback.textContent = "Submitting...";

        const { success, data } = await postFormData(
            form,
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/multiphotopost",
            {
                student_number: "s4976074",
                uqcloud_zone_id: "2abddf4b",
            }
        );

        feedback.textContent = success
            ? data.message || "Post submitted successfully!"
            : data.message || "Something went wrong.";

        if (success) {
            form.reset();
            loadStories(); // refresh stories dynamically after successful post
        }
    });

    // --- Limit photo size to 10MB each ---
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file && file.size > MAX_SIZE) {
                alert(
                    `"${file.name}" exceeds the 10 MB limit. Please choose a smaller file.`
                );
                input.value = ""; // clear invalid file
            }
        });
    });

    // --- GET stories ---
    async function loadStories() {
        container.innerHTML = "<p>Loading community stories...</p>";

        const data = await fetchGetData(
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/multiphotopost",
            {
                student_number: "s4976074",
                uqcloud_zone_id: "2abddf4b",
            }
        );

        if (!data) {
            container.innerHTML =
                '<p class="text-danger">Unable to load community stories.</p>';
            return;
        }

        if (Array.isArray(data) && data.length === 0) {
            container.innerHTML = `
                <p>No stories found.<br>
                Your submission was successful but the provided endpoint
                is not retrieving data at the moment.</p>`;
            return;
        }

        container.innerHTML = ""; // clear placeholder

        // ✅ Updated: now supports displaying up to 5 photos dynamically
        data.forEach((story) => {
            const card = document.createElement("div");
            card.className = "card story-card";

            // Gather available photo URLs
            const photos = [
                story.photo1,
                story.photo2,
                story.photo3,
                story.photo4,
                story.photo5,
            ].filter(Boolean); // remove undefined/null entries

            // Create HTML for images if they exist
            const imageHTML = photos
                .map(
                    (url) =>
                        `<img src="${url}" alt="Story image" class="story-img" loading="lazy"/>`
                )
                .join("");

            // Build story card HTML
            card.innerHTML = `
                <div class="story-images">${imageHTML}</div>
                <div class="card-body">
                    <h5 class="card-title">${story.author_name || story.name || "Anonymous"}</h5>
                    <h6 class="card-subtitle mb-2">${story.post_title || ""}</h6>
                    <p class="card-text">${
                        story.description ||
                        story.message ||
                        "No message provided."
                    }</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    loadStories(); // initial load
});
