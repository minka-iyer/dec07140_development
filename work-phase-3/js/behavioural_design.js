import { initButtons } from "./modules/buttons.js";

document.addEventListener("DOMContentLoaded", () => {
    initButtons();
});

import { postFormData } from './modules/postFormData.js';
            
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('community-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        feedback.textContent = 'Submitting...';
        const { success, data } = await postFormData(form, 'api_community', {
            'student_number': 's49760741',
            'uqcloud_zone_id': '2abddf4b',
        });

        if (success) {
            feedback.textContent = data.message;
            form.reset();
        } else {
            feedback.textContent = data.message || 'Something went wrong.';
        }
    });
});