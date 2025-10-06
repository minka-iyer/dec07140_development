import { fetchGetData } from './modules/getData.js';
                    
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('community-list');

    fetchGetData('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/', {
        'student_number': 's4976074',
        'uqcloud_zone_id': '2abddf4b'
    }).then(data => {
        if (!data) {
            container.innerHTML = '<p class="text-danger">Unable to load community members.</p>';
            return;
        }

        // ✨ Filter out gibberish responses
        const cleanData = data.filter(member => {
            // Check name exists and has more than 3 chars
            if (!member.name || member.name.length < 3) return false;
            // Filter out random strings without spaces or vowels
            const looksValid = /[aeiouAEIOU]/.test(member.name) && /\s/.test(member.name);
            return looksValid;
        });

        if (cleanData.length === 0) {
            container.innerHTML = '<p>No valid community reflections found yet.</p>';
            return;
        }

        cleanData.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${member.name}</h5>
                    <p class="card-text">${member.message || 'No message provided.'}</p>
                </div>
            `;
            container.appendChild(card);
        });
    });
});
