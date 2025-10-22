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

    // --- GET stories (DECO-provided GetModule logic) ---
    async function loadStories() {
        const data = await fetchGetData(
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/multiphotopost",
            {
                student_number: "s4976074",
                uqcloud_zone_id: "2abddf4b",
            }
        );

        if (!data) {
            container.innerHTML =
                '<p class="text-danger">Unable to load community members.</p>';
            return;
        }

        container.innerHTML = ""; // clear placeholder

        data.forEach((member) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${member.name}</h5>
                    <p class="card-text">${
                        member.message || "No message provided."
                    }</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    loadStories(); // initial load
});
