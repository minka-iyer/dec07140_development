import { postData } from "./postDataIndex.js";
import { getData } from "./getDataIndex.js";

// Load existing community data on page load
window.addEventListener("DOMContentLoaded", () => {
    getData();
});

const form = document.getElementById("community-form");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    feedback.textContent = "Submitting...";

    try {
        await postData(formData);
        feedback.textContent = "Thank you for joining!";

        form.reset();
        await getData(); // 🔥 refresh the displayed list
    } catch (err) {
        console.error("Form submission failed:", err);
        feedback.textContent = "Error submitting form. Please try again.";
    }
});
