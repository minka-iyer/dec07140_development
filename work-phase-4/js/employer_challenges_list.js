// Challenge data with full descriptions and links
const challengeData = {
    "GreenTech Sustainability Hack|GreenTech": {
        employer: "GreenTech",
        description: "Co-create low-carbon tech solutions with real industry mentors. Learn more by heading to our website's project list.",
        link: "greentech.com/sustainability"
    },
    "GreenTech Sustainability Hack|GreenGrid Solutions": {
        employer: "GreenGrid Solutions",
        description: "Create a simple app or dashboard that helps small businesses track their energy use and find easy ways to reduce waste. Learn more by heading to our website's project list.",
        link: "greengrid.com/sustainability"
    },
    "AI for Inclusion|Infosys": {
        employer: "Infosys",
        description: "Tackle bias in generative AI by training or fine-tuning models to better represent global diversity. Learn more by heading to our website's project list.",
        link: "infosys.com/projects"
    },
    "Smart Mobility Data Challenge|Wahoo": {
        employer: "Wahoo",
        description: "Analyse real e-bike usage data to identify unsafe intersections and propose infrastructure improvements for cyclists. Learn more by heading to our website's project list.",
        link: "wahoo.com/mobility"
    },
    "Smart Mobility Data Challenge|CityCycle": {
        employer: "CityCycle",
        description: "Use city transport data to find ways to make cycling safer — for instance, by mapping risky routes or suggesting safer travel times. Learn more by heading to our website's project list.",
        link: "citycycle.com/data-challenge"
    },
    "AI for Accessibility|InclusiveAI Lab": {
        employer: "InclusiveAI Lab",
        description: "Design an AI tool that helps people with different abilities use digital platforms more easily — for example, image generators that better represent all kinds of people. Learn more by heading to our website's project list.",
        link: "inclusiveai.com/projects"
    },
    "Health Data Visualization|MediData Labs": {
        employer: "MediData Labs",
        description: "Build an interactive chart or dashboard that helps the public understand local health data, such as vaccination rates or air quality. Learn more by heading to our website's project list.",
        link: "medidata.com/challenges"
    },
    "AI for Social Inclusion|LinguaLink": {
        employer: "LinguaLink",
        description: "Design a chatbot or translation tool that helps people from different language backgrounds access everyday services like healthcare or education. Learn more by heading to our website's project list.",
        link: "lingualink.com/challenges"
    },
    "Fair Recruitment Tools|FairHire": {
        employer: "FairHire",
        description: "Build a prototype that helps hiring teams focus on skills instead of personal details — for example, a form that hides names while highlighting key qualifications. Learn more by heading to our website's project list.",
        link: "fairhire.com/tools"
    },
    "Climate Data Insights|ClimateWatch": {
        employer: "ClimateWatch",
        description: "Turn raw weather or environmental data into easy-to-understand visuals that show how climate change affects local communities. Learn more by heading to our website's project list.",
        link: "climatewatch.org/insights"
    },
    "Mental Health Support Chatbot|MindfulCo": {
        employer: "MindfulCo",
        description: "Design a friendly chatbot that helps students or employees check in with their mood and find helpful mental health resources. Learn more by heading to our website's project list.",
        link: "mindfulco.com/chatbot"
    },
    "Urban Greening Tracker|UrbanCanopy": {
        employer: "UrbanCanopy",
        description: "Create an app that lets local residents report where more trees, gardens, or green spaces could be added in their city. Learn more by heading to our website's project list.",
        link: "urbancanopy.com/tracker"
    },
    "Healthy Habits Game|HabitHero": {
        employer: "HabitHero",
        description: "Build a fun, gamified app that rewards users for small daily actions like drinking water, walking, or getting enough sleep. Learn more by heading to our website's project list.",
        link: "habithero.com/game"
    },
    "Inclusive Voice Recognition|VoxSense": {
        employer: "VoxSense",
        description: "Improve a voice assistant so it better understands people with diverse accents or speech patterns. Learn more by heading to our website's project list.",
        link: "voxsense.com/inclusive"
    },
    "Transparent Spending Dashboard|OpenBudget": {
        employer: "OpenBudget",
        description: "Design a simple data visualization that shows where community or government funds are being spent — making budgeting easier to understand. Learn more by heading to our website's project list.",
        link: "openbudget.org/dashboard"
    },
    "Digital Detox Assistant|Unplug": {
        employer: "Unplug",
        description: "Build an app that helps users track screen time and create mindful breaks, with gentle reminders instead of guilt-inducing alerts. Learn more by heading to our website's project list.",
        link: "unplug.app/detox"
    },
    "Education Access Finder|Pathways": {
        employer: "Pathways",
        description: "Design a platform that connects students from rural or low-income backgrounds with free online learning opportunities. Learn more by heading to our website's project list.",
        link: "pathways.edu/access"
    },
    "Community Skills Exchange|SkillSwap": {
        employer: "SkillSwap",
        description: "Create a digital space where people can swap skills — for example, offering language lessons in exchange for coding help. Learn more by heading to our website's project list.",
        link: "skillswap.com/exchange"
    },
    "Farm-to-Table Data Tracker|FarmDirect": {
        employer: "FarmDirect",
        description: "Build a tool that helps local farmers share where their produce is going and connect directly with restaurants or markets. Learn more by heading to our website's project list.",
        link: "farmdirect.com/tracker"
    },
    "Eco Footprint Visualizer|Footprint": {
        employer: "Footprint",
        description: "Design a simple quiz or dashboard that helps users understand the carbon footprint of their daily habits. Learn more by heading to our website's project list.",
        link: "footprint.eco/visualizer"
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('challengeModal');
    const closeBtn = document.querySelector('.close');
    const viewButtons = document.querySelectorAll('.view-btn');

    // Add click handler to all view buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
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
            } else {
                console.error('Challenge not found:', key);
            }
        });
    });

    // Close modal
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
});