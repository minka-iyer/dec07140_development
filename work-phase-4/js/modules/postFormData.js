// work-phase-4/js/modules/postFormData.js

const postFormData = async (form, url, headers = {}) => {
    try {
        // Build form data
        const formData = new FormData(form);

        // Send POST request
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: formData,
        });

        // Parse JSON response
        const data = await response.json();

        // Return structured result
        return { success: response.ok, data };
    } catch (error) {
        console.error("❌ Error submitting form:", error);
        return { success: false, data: { message: "Error submitting form" } };
    }
};

export { postFormData };
