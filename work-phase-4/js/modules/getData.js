// getData.js

const fetchGetData = async (url, headers = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`Server returned an error: ${response.status}`);
        }

        const data = await response.json();

        // ✅ If API works and returns data
        if (Array.isArray(data) && data.length > 0) {
            console.log("✅ API data loaded successfully:", data);
            return data;
        }

        // ⚠️ If API returns an empty array, use mock data
        console.warn("⚠️ API returned empty array. Using mock stories for display.");
        return getMockStories();

    } catch (error) {
        console.error("❌ Error fetching data:", error);
        // Fallback in case of API error
        return getMockStories();
    }
};

// 🌿 Local fallback: mock stories
function getMockStories() {
    return [
        {
            author_name: "Amara Patel",
            post_title: "Finding light through burnout",
            description: "After months of juggling study, part-time work, and volunteering, I completely burned out. I started taking morning walks and learning that stillness is part of growth too.",
            photo1: "../work-phase-3/assets/fulfilment.jpg",
        },
        {
            author_name: "Ethan Nguyen",
            post_title: "Building confidence, one presentation at a time",
            description: "Public speaking used to terrify me. But joining an innovation challenge forced me to step up — and now I’ve started volunteering as an event MC. Growth happens outside comfort.",
            photo1: "assets/community-stories/ethan-1.jpg",
            photo2: "assets/community-stories/ethan-2.jpg",
        },
        {
            author_name: "Liam Chen",
            post_title: "From Impostor Syndrome to Innovation",
            description: "My small idea to improve student mental health through an anonymous story-sharing app gained traction. You don’t need to be the loudest voice — just the brave one to start.",
            photo1: "assets/community-stories/liam-1.jpg",
            photo2: "assets/community-stories/liam-2.jpg",
        },
    ];
}

export { fetchGetData };
