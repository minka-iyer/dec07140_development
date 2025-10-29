import { postFormData } from './modules/postFormData.js';
import { fetchGetData } from './modules/getData.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('community-form');
    const feedback = document.getElementById('form-feedback');
    const communityList = document.getElementById('community-list');

    // Submit form
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            feedback.textContent = 'Submitting...';
            feedback.style.color = '#175873';

            const { success, data } = await postFormData(
                form, 
                'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/', 
                {
                    'student_number': 's4976074',
                    'uqcloud_zone_id': '2abddf4b',
                }
            );

            if (success) {
                feedback.textContent = data.message || 'Successfully submitted!';
                feedback.style.color = '#059669';
                form.reset();
                
                // Reload community reflections
                loadCommunityReflections();
            } else {
                feedback.textContent = data.message || 'Something went wrong. Please try again.';
                feedback.style.color = '#dc2626';
            }
        });
    }

    // Load community reflections on page load
    loadCommunityReflections();

    async function loadCommunityReflections() {
        const data = await fetchGetData(
            'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/',
            {
                'student_number': 's4976074',
                'uqcloud_zone_id': '2abddf4b',
            }
        );

        if (!data || data.length === 0) {
            communityList.innerHTML += '<p>No community reflections yet. Be the first to share!</p>';
            return;
        }

        // Clear existing content except the header
        const existingCards = communityList.querySelectorAll('.community-card');
        existingCards.forEach(card => card.remove());

        // Create cards for each reflection
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'community-card';

            card.innerHTML = `
                ${item.photo ? `<img src="${item.photo}" alt="Community member photo" />` : ''}
                <h4>${item.name || 'Anonymous'}</h4>
                <small>${item.email || ''}</small>
                <p>${item.message || 'No message provided.'}</p>
            `;

            communityList.appendChild(card);
        });
    }
});
