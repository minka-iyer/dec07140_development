// Challenge data with full descriptions and links
const challengeData = {
    "GreenTech Sustainability Hack|GreenTech": {
        employer: "GreenTech",
        description: "Co-create low-carbon tech solutions with real industry mentors. Learn more by heading to our website's project list.",
        link: "greentech.com/sustainability",
        status: "active",
        incentives: ["mentorship"]
    },
    "GreenTech Sustainability Hack|GreenGrid Solutions": {
        employer: "GreenGrid Solutions",
        description: "Create a simple app or dashboard that helps small businesses track their energy use and find easy ways to reduce waste. Learn more by heading to our website's project list.",
        link: "greengrid.com/sustainability",
        status: "upcoming",
        incentives: ["monetary", "mentorship"]
    },
    "AI for Inclusion|Infosys": {
        employer: "Infosys",
        description: "Tackle bias in generative AI by training or fine-tuning models to better represent global diversity. Learn more by heading to our website's project list.",
        link: "infosys.com/projects",
        status: "upcoming",
        incentives: ["internship", "publication"]
    },
    "Smart Mobility Data Challenge|Wahoo": {
        employer: "Wahoo",
        description: "Analyse real e-bike usage data to identify unsafe intersections and propose infrastructure improvements for cyclists. Learn more by heading to our website's project list.",
        link: "wahoo.com/mobility",
        status: "completed",
        incentives: ["monetary"]
    },
    "Smart Mobility Data Challenge|CityCycle": {
        employer: "CityCycle",
        description: "Use city transport data to find ways to make cycling safer — for instance, by mapping risky routes or suggesting safer travel times. Learn more by heading to our website's project list.",
        link: "citycycle.com/data-challenge",
        status: "completed",
        incentives: ["monetary", "publication"]
    },
    "AI for Accessibility|InclusiveAI Lab": {
        employer: "InclusiveAI Lab",
        description: "Design an AI tool that helps people with different abilities use digital platforms more easily — for example, image generators that better represent all kinds of people. Learn more by heading to our website's project list.",
        link: "inclusiveai.com/projects",
        status: "active",
        incentives: ["mentorship", "internship"]
    },
    "Health Data Visualization|MediData Labs": {
        employer: "MediData Labs",
        description: "Build an interactive chart or dashboard that helps the public understand local health data, such as vaccination rates or air quality. Learn more by heading to our website's project list.",
        link: "medidata.com/challenges",
        status: "active",
        incentives: ["monetary"]
    },
    "AI for Social Inclusion|LinguaLink": {
        employer: "LinguaLink",
        description: "Design a chatbot or translation tool that helps people from different language backgrounds access everyday services like healthcare or education. Learn more by heading to our website's project list.",
        link: "lingualink.com/challenges",
        status: "active",
        incentives: ["mentorship", "publication"]
    },
    "Fair Recruitment Tools|FairHire": {
        employer: "FairHire",
        description: "Build a prototype that helps hiring teams focus on skills instead of personal details — for example, a form that hides names while highlighting key qualifications. Learn more by heading to our website's project list.",
        link: "fairhire.com/tools",
        status: "upcoming",
        incentives: ["internship", "monetary"]
    },
    "Climate Data Insights|ClimateWatch": {
        employer: "ClimateWatch",
        description: "Turn raw weather or environmental data into easy-to-understand visuals that show how climate change affects local communities. Learn more by heading to our website's project list.",
        link: "climatewatch.org/insights",
        status: "active",
        incentives: ["monetary", "publication"]
    },
    "Mental Health Support Chatbot|MindfulCo": {
        employer: "MindfulCo",
        description: "Design a friendly chatbot that helps students or employees check in with their mood and find helpful mental health resources. Learn more by heading to our website's project list.",
        link: "mindfulco.com/chatbot",
        status: "active",
        incentives: ["mentorship"]
    },
    "Urban Greening Tracker|UrbanCanopy": {
        employer: "UrbanCanopy",
        description: "Create an app that lets local residents report where more trees, gardens, or green spaces could be added in their city. Learn more by heading to our website's project list.",
        link: "urbancanopy.com/tracker",
        status: "upcoming",
        incentives: ["monetary"]
    },
    "Healthy Habits Game|HabitHero": {
        employer: "HabitHero",
        description: "Build a fun, gamified app that rewards users for small daily actions like drinking water, walking, or getting enough sleep. Learn more by heading to our website's project list.",
        link: "habithero.com/game",
        status: "active",
        incentives: ["monetary", "internship"]
    },
    "Inclusive Voice Recognition|VoxSense": {
        employer: "VoxSense",
        description: "Improve a voice assistant so it better understands people with diverse accents or speech patterns. Learn more by heading to our website's project list.",
        link: "voxsense.com/inclusive",
        status: "completed",
        incentives: ["publication"]
    },
    "Transparent Spending Dashboard|OpenBudget": {
        employer: "OpenBudget",
        description: "Design a simple data visualization that shows where community or government funds are being spent — making budgeting easier to understand. Learn more by heading to our website's project list.",
        link: "openbudget.org/dashboard",
        status: "active",
        incentives: ["monetary", "publication"]
    },
    "Digital Detox Assistant|Unplug": {
        employer: "Unplug",
        description: "Build an app that helps users track screen time and create mindful breaks, with gentle reminders instead of guilt-inducing alerts. Learn more by heading to our website's project list.",
        link: "unplug.app/detox",
        status: "upcoming",
        incentives: ["mentorship"]
    },
    "Education Access Finder|Pathways": {
        employer: "Pathways",
        description: "Design a platform that connects students from rural or low-income backgrounds with free online learning opportunities. Learn more by heading to our website's project list.",
        link: "pathways.edu/access",
        status: "active",
        incentives: ["internship", "mentorship"]
    },
    "Community Skills Exchange|SkillSwap": {
        employer: "SkillSwap",
        description: "Create a digital space where people can swap skills — for example, offering language lessons in exchange for coding help. Learn more by heading to our website's project list.",
        link: "skillswap.com/exchange",
        status: "completed",
        incentives: ["publication"]
    },
    "Farm-to-Table Data Tracker|FarmDirect": {
        employer: "FarmDirect",
        description: "Build a tool that helps local farmers share where their produce is going and connect directly with restaurants or markets. Learn more by heading to our website's project list.",
        link: "farmdirect.com/tracker",
        status: "active",
        incentives: ["monetary"]
    },
    "Eco Footprint Visualizer|Footprint": {
        employer: "Footprint",
        description: "Design a simple quiz or dashboard that helps users understand the carbon footprint of their daily habits. Learn more by heading to our website's project list.",
        link: "footprint.eco/visualizer",
        status: "upcoming",
        incentives: ["monetary", "mentorship"]
    }
};

// State for filters and search
let activeFilters = {
    incentives: [],
    status: [],
    searchTerm: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupModal();
    setupFilters();
    setupSearch();
    setupSort();
    setupReset();
});

// ===== MODAL =====
function setupModal() {
    const modal = document.getElementById('challengeModal');
    const closeBtn = document.querySelector('.close');
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.challenge-card');
            const title = card.querySelector('h3').textContent;
            const employerTag = card.querySelector('.employer-tag').textContent.replace('Posted by ', '');
            const key = `${title}|${employerTag}`;
            const data = challengeData[key];

            if (data) {
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-employer').textContent = data.employer;
                document.getElementById('modal-description').textContent = data.description;
                document.getElementById('modal-link').textContent = data.link;
                document.getElementById('modal-link').href = `https://${data.link}`;
                modal.style.display = 'block';
            }
        });
    });

    if (closeBtn) closeBtn.onclick = () => (modal.style.display = 'none');
    window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
}

// ===== FILTERS =====
function setupFilters() {
    const checkboxes = document.querySelectorAll('.top-filters input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
}

// ===== SEARCH =====
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            activeFilters.searchTerm = searchInput.value.toLowerCase();
            applyFilters();
        });
    }
}

// ===== SORT =====
function setupSort() {
    const sortSelect = document.getElementById('sort');
    if (!sortSelect) return;
    sortSelect.addEventListener('change', () => sortChallenges(sortSelect.value));
}

// ===== RESET =====
function setupReset() {
    const resetBtn = document.querySelector('.reset-btn');
    const searchInput = document.querySelector('.search-bar input');
    const checkboxes = document.querySelectorAll('.top-filters input[type="checkbox"]');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            checkboxes.forEach(cb => (cb.checked = false));
            activeFilters = { incentives: [], status: [], searchTerm: '' };
            applyFilters();
        });
    }
}

// ===== APPLY FILTERS =====
function applyFilters() {
    const searchInput = document.querySelector('.search-bar input');
    const checkboxes = document.querySelectorAll('.top-filters input[type="checkbox"]');
    const cards = document.querySelectorAll('.challenge-card');

    activeFilters.searchTerm = searchInput.value.toLowerCase();
    activeFilters.incentives = Array.from(checkboxes)
        .filter(cb => cb.checked && ['monetary', 'mentorship', 'internship', 'publication'].includes(cb.value))
        .map(cb => cb.value);
    activeFilters.status = Array.from(checkboxes)
        .filter(cb => cb.checked && ['active', 'upcoming', 'completed'].includes(cb.value))
        .map(cb => cb.value);

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const employerTag = card.querySelector('.employer-tag').textContent.replace('Posted by ', '');
        const key = `${title}|${employerTag}`;
        const data = challengeData[key];
        if (!data) return (card.style.display = 'none');

        let visible = true;

        if (activeFilters.incentives.length && !activeFilters.incentives.some(i => data.incentives.includes(i))) visible = false;
        if (activeFilters.status.length && !activeFilters.status.includes(data.status)) visible = false;
        if (activeFilters.searchTerm) {
            const combined = `${title} ${employerTag} ${data.description}`.toLowerCase();
            if (!combined.includes(activeFilters.searchTerm)) visible = false;
        }

        card.style.display = visible ? 'flex' : 'none';
    });

    showNoResultsMessage();
}

// ===== SORT CHALLENGES =====
function sortChallenges(sortType) {
    const grid = document.querySelector('.challenge-grid');
    const cards = Array.from(grid.querySelectorAll('.challenge-card'));

    cards.sort((a, b) => {
        const textA = a.querySelector('h3').textContent.toLowerCase();
        const textB = b.querySelector('h3').textContent.toLowerCase();
        return textA.localeCompare(textB);
    });

    cards.forEach(c => grid.appendChild(c));
}

// ===== NO RESULTS =====
function showNoResultsMessage() {
    const grid = document.querySelector('.challenge-grid');
    const visibleCards = Array.from(grid.querySelectorAll('.challenge-card')).filter(c => c.style.display !== 'none');
    const existingMsg = grid.querySelector('.no-results-message');
    if (existingMsg) existingMsg.remove();

    if (visibleCards.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'no-results-message';
        msg.innerHTML = `<p>No challenges match your filters.</p><p>Try adjusting your search or resetting filters.</p>`;
        grid.appendChild(msg);
    }
}
