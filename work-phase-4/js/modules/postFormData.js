// work-phase-4/js/modules/postFormData.js
const postFormData = async (form, url, params = {}) => {
    try {
        // Build form data
        const formData = new FormData(form);
        
        // Add student_number and uqcloud_zone_id to FormData
        Object.keys(params).forEach(key => {
            formData.append(key, params[key]);
        });

        // Send POST request
        // IMPORTANT: Don't set headers when using FormData
        // Browser automatically sets Content-Type with boundary
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Parse JSON response
        const data = await response.json();
        
        console.log('POST Response status:', response.status);
        console.log('POST Response data:', data);

        // Return structured result
        return { success: response.ok, data };
    } catch (error) {
        console.error("❌ Error submitting form:", error);
        return { success: false, data: { message: "Error submitting form" } };
    }
};

export { postFormData };
