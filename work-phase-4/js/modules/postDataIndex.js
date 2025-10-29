export async function postData(formData) {
    try {
        const response = await fetch("http://localhost:3000/community", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Post success:", data);
        return data;
    } catch (error) {
        console.error("Post failed:", error);
        throw error;
    }
}
