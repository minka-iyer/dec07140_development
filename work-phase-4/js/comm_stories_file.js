// Community Stories Hub - File Upload Handler
document.addEventListener('DOMContentLoaded', function() {
    
    const fileInput = document.querySelector('input[type="file"]');
    const form = document.querySelector('.share-story form');
    
    if (!fileInput) return;
    
    // Make file input accept multiple files
    fileInput.setAttribute('multiple', 'multiple');
    fileInput.setAttribute('accept', 'image/*');
    
    let selectedFiles = [];
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    
    // Create new upload interface
    const fileUploadHTML = `
        <div class="file-upload-section">
            <label>Upload up to 5 photos (max 10 MB each)</label>
            <div class="file-upload-wrapper">
                <div class="upload-icon">📷</div>
                <div class="upload-text">Click to upload or drag and drop</div>
                <div class="upload-subtext">PNG, JPG, GIF up to 10MB</div>
                <input type="file" id="photo-upload" accept="image/*" multiple>
            </div>
            <div class="file-list" id="file-list"></div>
        </div>
    `;
    
    // Replace old file inputs with new interface
    const oldFileInputs = document.querySelectorAll('input[type="file"]');
    if (oldFileInputs.length > 0) {
        const firstFileInput = oldFileInputs[0];
        const parentGroup = firstFileInput.closest('.form-group');
        
        if (parentGroup) {
            parentGroup.innerHTML = fileUploadHTML;
            
            // Get new elements
            const newFileInput = document.getElementById('photo-upload');
            const fileList = document.getElementById('file-list');
            const uploadWrapper = document.querySelector('.file-upload-wrapper');
            
            // File input change handler
            newFileInput.addEventListener('change', function(e) {
                handleFiles(e.target.files);
            });
            
            // Drag and drop handlers
            uploadWrapper.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadWrapper.style.borderColor = 'var(--accent-color-1)';
                uploadWrapper.style.background = 'rgba(59, 214, 232, 0.1)';
            });
            
            uploadWrapper.addEventListener('dragleave', function(e) {
                e.preventDefault();
                uploadWrapper.style.borderColor = '';
                uploadWrapper.style.background = '';
            });
            
            uploadWrapper.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadWrapper.style.borderColor = '';
                uploadWrapper.style.background = '';
                handleFiles(e.dataTransfer.files);
            });
            
            // Handle files function
            function handleFiles(files) {
                for (let file of files) {
                    // Check if we've reached max files
                    if (selectedFiles.length >= MAX_FILES) {
                        showFeedback('Maximum 5 photos allowed', 'error');
                        break;
                    }
                    
                    // Check file size
                    if (file.size > MAX_FILE_SIZE) {
                        showFeedback(`${file.name} is too large (max 10MB)`, 'error');
                        continue;
                    }
                    
                    // Check if file is an image
                    if (!file.type.startsWith('image/')) {
                        showFeedback(`${file.name} is not an image`, 'error');
                        continue;
                    }
                    
                    // Check if file already added
                    if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                        showFeedback(`${file.name} already added`, 'error');
                        continue;
                    }
                    
                    selectedFiles.push(file);
                }
                
                updateFileList();
            }
            
            // Update file list display
            function updateFileList() {
                if (selectedFiles.length === 0) {
                    fileList.innerHTML = '';
                    fileList.style.display = 'none';
                    return;
                }
                
                fileList.style.display = 'block';
                fileList.innerHTML = '';
                
                selectedFiles.forEach((file, index) => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.innerHTML = `
                        <span class="file-item-name">${file.name}</span>
                        <button type="button" class="file-item-remove" data-index="${index}">×</button>
                    `;
                    fileList.appendChild(fileItem);
                });
                
                // Add remove handlers
                document.querySelectorAll('.file-item-remove').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        selectedFiles.splice(index, 1);
                        updateFileList();
                    });
                });
            }
            
            // Form submit handler
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.querySelector('input[type="text"]').value.trim();
                    const title = document.querySelectorAll('input[type="text"]')[1].value.trim();
                    const description = document.querySelector('textarea').value.trim();
                    
                    // Validation
                    if (!name || !title || !description) {
                        showFeedback('Please fill in all fields', 'error');
                        return;
                    }
                    
                    if (selectedFiles.length === 0) {
                        showFeedback('Please upload at least one photo', 'error');
                        return;
                    }
                    
                    // Success message (in real app, this would submit to server)
                    showFeedback('Story submitted successfully! 🎉', 'success');
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        selectedFiles = [];
                        updateFileList();
                        clearFeedback();
                    }, 2000);
                });
            }
        }
    }
    
    // Show feedback message
    function showFeedback(message, type) {
        let feedback = document.querySelector('.feedback-text');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback-text';
            form.appendChild(feedback);
        }
        feedback.textContent = message;
        feedback.className = `feedback-text ${type}`;
        feedback.style.display = 'block';
    }
    
    // Clear feedback
    function clearFeedback() {
        const feedback = document.querySelector('.feedback-text');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
});