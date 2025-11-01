// Mentor data
const mentors = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        affiliation: "Stanford University",
        avatar: "👩‍🔬",
        description: "I specialize in AI ethics and can help you navigate responsible AI development, understand bias in machine learning, and design inclusive tech solutions.",
        categories: [
            { icon: "assets/icons/cloud_DATA_ai.png", name: "Cloud, Data & AI" },
            { icon: "assets/icons/research.png", name: "Research & Emerging Sciences" }
        ],
        email: "sarah.chen@stanford.edu",
        linkedin: "https://linkedin.com/in/sarahchen"
    },
    {
        id: 2,
        name: "Marcus Thompson",
        affiliation: "Google Cloud",
        avatar: "👨‍💻",
        description: "With 15 years in cloud architecture, I can guide you through system design, scalability challenges, and cloud migration strategies.",
        categories: [
            { icon: "assets/icons/tech_engineering.png", name: "Technology & Engineering" },
            { icon: "assets/icons/cloud_DATA_ai.png", name: "Cloud, Data & AI" }
        ],
        email: "marcus.t@google.com",
        linkedin: "https://linkedin.com/in/marcusthompson"
    },
    {
        id: 3,
        name: "Dr. Priya Kapoor",
        affiliation: "MIT Climate Lab",
        avatar: "🌍",
        description: "I focus on climate tech innovation and can mentor you on building sustainable solutions, carbon tracking systems, and green technology startups.",
        categories: [
            { icon: "assets/icons/sustainability.png", name: "Sustainability & Social Impact" },
            { icon: "assets/icons/research.png", name: "Research & Emerging Sciences" }
        ],
        email: "pkapoor@mit.edu",
        linkedin: "https://linkedin.com/in/priyakapoor"
    },
    {
        id: 4,
        name: "Alex Rivera",
        affiliation: "Adobe Design",
        avatar: "🎨",
        description: "As a senior UX designer, I can help you master user research, design thinking, prototyping, and building portfolios that stand out.",
        categories: [
            { icon: "assets/icons/design_ux.png", name: "Design, UX & Creative Tech" },
            { icon: "assets/icons/tech_engineering.png", name: "Technology & Engineering" }
        ],
        email: "alex.rivera@adobe.com",
        linkedin: "https://linkedin.com/in/alexrivera"
    },
    {
        id: 5,
        name: "James Okonkwo",
        affiliation: "TechStars Ventures",
        avatar: "🚀",
        description: "I've mentored 50+ startups from idea to Series A. I can help with business models, pitch decks, fundraising, and scaling strategies.",
        categories: [
            { icon: "assets/icons/innovation.png", name: "Innovation & Entrepreneurship" },
            { icon: "assets/icons/leadership.png", name: "Leadership & Professional Growth" }
        ],
        email: "james@techstars.com",
        linkedin: "https://linkedin.com/in/jamesokonkwo"
    },
    {
        id: 6,
        name: "Dr. Emily Zhang",
        affiliation: "Johns Hopkins Research",
        avatar: "🔬",
        description: "My expertise is in biotech and emerging sciences. I can guide you through research methodologies, publication strategies, and PhD applications.",
        categories: [
            { icon: "assets/icons/research.png", name: "Research & Emerging Sciences" },
            { icon: "assets/icons/leadership.png", name: "Leadership & Professional Growth" }
        ],
        email: "ezhang@jhu.edu",
        linkedin: "https://linkedin.com/in/emilyzhang"
    },
    {
        id: 7,
        name: "Raj Patel",
        affiliation: "Microsoft Azure",
        avatar: "💾",
        description: "I specialize in data engineering and can mentor you on building data pipelines, working with big data, and transitioning to data science roles.",
        categories: [
            { icon: "assets/icons/cloud_DATA_ai.png", name: "Cloud, Data & AI" },
            { icon: "assets/icons/tech_engineering.png", name: "Technology & Engineering" }
        ],
        email: "raj.patel@microsoft.com",
        linkedin: "https://linkedin.com/in/rajpatel"
    },
    {
        id: 8,
        name: "Maya Anderson",
        affiliation: "Patagonia",
        avatar: "♻️",
        description: "I lead sustainability initiatives at Patagonia. I can help you understand circular economy, ESG reporting, and building purpose-driven brands.",
        categories: [
            { icon: "assets/icons/sustainability.png", name: "Sustainability & Social Impact" },
            { icon: "assets/icons/leadership.png", name: "Leadership & Professional Growth" }
        ],
        email: "maya.anderson@patagonia.com",
        linkedin: "https://linkedin.com/in/mayaanderson"
    },
    {
        id: 9,
        name: "Carlos Mendoza",
        affiliation: "Y Combinator",
        avatar: "💡",
        description: "I help early-stage founders find product-market fit, build MVPs quickly, and navigate the startup ecosystem.",
        categories: [
            { icon: "assets/icons/innovation.png", name: "Innovation & Entrepreneurship" },
            { icon: "assets/icons/tech_engineering.png", name: "Technology & Engineering" }
        ],
        email: "carlos@ycombinator.com",
        linkedin: "https://linkedin.com/in/carlosmendoza"
    },
    {
        id: 10,
        name: "Dr. Amina Hassan",
        affiliation: "NASA JPL",
        avatar: "🛰️",
        description: "I work on space exploration technology and can mentor you on aerospace engineering, robotics, and pursuing STEM research careers.",
        categories: [
            { icon: "assets/icons/research.png", name: "Research & Emerging Sciences" },
            { icon: "assets/icons/tech_engineering.png", name: "Technology & Engineering" }
        ],
        email: "amina.hassan@jpl.nasa.gov",
        linkedin: "https://linkedin.com/in/aminahassan"
    }
];

let shortlist = JSON.parse(localStorage.getItem('mentorShortlist') || '[]');
let connections = JSON.parse(localStorage.getItem('mentorConnections') || '[]');

// Render mentors
function renderMentors() {
    const grid = document.getElementById('mentors-grid');
    
    grid.innerHTML = mentors.map(mentor => `
        <article class="mentor-card" data-id="${mentor.id}">
            <div class="mentor-card-header">
                <div class="mentor-avatar">${mentor.avatar}</div>
                <div class="mentor-info">
                    <h3 class="mentor-name">${mentor.name}</h3>
                    <p class="mentor-affiliation">${mentor.affiliation}</p>
                </div>
                <button class="heart-btn ${shortlist.includes(mentor.id) || connections.includes(mentor.id) ? 'favorited' : ''}" 
                        onclick="toggleShortlist(${mentor.id})"
                        aria-label="${shortlist.includes(mentor.id) || connections.includes(mentor.id) ? 'Remove from' : 'Add to'} shortlist"
                        ${connections.includes(mentor.id) ? 'disabled' : ''}>
                    ${shortlist.includes(mentor.id) || connections.includes(mentor.id) ? '❤️' : '♡'}
                </button>
            </div>
            <div class="mentor-content">
                <p class="mentor-description">${mentor.description}</p>
                <div class="mentor-categories">
                    ${mentor.categories.map(cat => `
                        <div class="category-icon" title="${cat.name}">
                            <img src="${cat.icon}" alt="${cat.name}" />
                        </div>
                    `).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

// Toggle shortlist
function toggleShortlist(id) {
    // Don't allow removing if already connected
    if (connections.includes(id)) {
        return;
    }
    
    if (shortlist.includes(id)) {
        shortlist = shortlist.filter(mentorId => mentorId !== id);
    } else {
        shortlist.push(id);
    }
    localStorage.setItem('mentorShortlist', JSON.stringify(shortlist));
    renderMentors();
    renderSidebar();
}

// Remove from shortlist
function removeFromShortlist(id) {
    shortlist = shortlist.filter(mentorId => mentorId !== id);
    localStorage.setItem('mentorShortlist', JSON.stringify(shortlist));
    renderMentors();
    renderSidebar();
}

// Move to connections
function moveToConnections(id) {
    if (!connections.includes(id)) {
        connections.push(id);
        shortlist = shortlist.filter(mentorId => mentorId !== id);
        localStorage.setItem('mentorConnections', JSON.stringify(connections));
        localStorage.setItem('mentorShortlist', JSON.stringify(shortlist));
        renderMentors();
        renderSidebar();
    }
}

// Remove from connections
function removeFromConnections(id) {
    connections = connections.filter(mentorId => mentorId !== id);
    localStorage.setItem('mentorConnections', JSON.stringify(connections));
    renderMentors();
    renderSidebar();
}

// Render sidebar
function renderSidebar() {
    const shortlistContainer = document.getElementById('shortlist-container');
    const connectionsContainer = document.getElementById('connections-container');

    // Render shortlist
    if (shortlist.length === 0) {
        shortlistContainer.innerHTML = '<p class="empty-state">Click the ♡ to shortlist mentors you\'d like to connect with</p>';
    } else {
        shortlistContainer.innerHTML = shortlist.map(id => {
            const mentor = mentors.find(m => m.id === id);
            return `
                <div class="sidebar-mentor">
                    <div class="sidebar-avatar">${mentor.avatar}</div>
                    <div class="sidebar-info">
                        <div class="sidebar-name">${mentor.name}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromShortlist(${id})" 
                            aria-label="Remove ${mentor.name} from shortlist" title="Remove">×</button>
                </div>
                <div class="mentor-actions">
                    <a href="mailto:${mentor.email}" class="contact-btn" title="Send Email">
                        📧
                    </a>
                    <a href="${mentor.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-btn" title="View LinkedIn">
                        💼
                    </a>
                    <button class="connect-btn" onclick="moveToConnections(${id})" title="Mark as Connected">
                        ✓ Connected
                    </button>
                </div>
            `;
        }).join('');
    }

    // Render connections
    if (connections.length === 0) {
        connectionsContainer.innerHTML = '<p class="empty-state">Mentors you\'ve connected with will appear here</p>';
    } else {
        connectionsContainer.innerHTML = connections.map(id => {
            const mentor = mentors.find(m => m.id === id);
            return `
                <div class="sidebar-mentor">
                    <div class="sidebar-avatar">${mentor.avatar}</div>
                    <div class="sidebar-info">
                        <div class="sidebar-name">${mentor.name}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromConnections(${id})" 
                            aria-label="Remove ${mentor.name} from connections" title="Remove">×</button>
                </div>
                <div class="mentor-actions">
                    <a href="mailto:${mentor.email}" class="contact-btn" title="Send Email">
                        📧
                    </a>
                    <a href="${mentor.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-btn" title="View LinkedIn">
                        💼
                    </a>
                </div>
            `;
        }).join('');
    }
}

// Modal functions
function openModal() {
    document.getElementById('info-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('info-modal').classList.remove('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Render initial content
    renderMentors();
    renderSidebar();

    // Modal controls
    const infoBtn = document.getElementById('info-btn');
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('info-modal');

    if (infoBtn) {
        infoBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
});