export const ALLOWED_FILE_TYPES = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'video/mp4': ['.mp4']
};

export const MAX_FILE_SIZE = 65536 * 1024;

export const validateStep = (step, formData) => {
    const errors = {};

    switch (step) {
        case 0:
            if (!formData.title?.trim()) {
                errors.title = 'Title is required';
            } else if (formData.title.length > 255) {
                errors.title = 'Title must be less than 255 characters';
            }
            if (!formData.description?.trim()) {
                errors.description = 'Description is required';
            }
            break;

        case 1:
            if (!formData.images || formData.images.length === 0) {
                errors.images = 'At least one image is required';
            }
            break;

        case 2:
            if (!formData.time) {
                errors.time = 'Opening time is required';
            } else {
                const selectedTime = new Date(formData.time);
                const currentTime = new Date();
                if (selectedTime <= currentTime) {
                    errors.time = 'Opening time must be in the future';
                }
            }
            break;

        case 4:
            if (!formData.vision?.trim()) {
                errors.vision = 'Vision is required';
            }
            break;

        case 5:
            if (!formData.privacy || !['private', 'friends', 'public'].includes(formData.privacy)) {
                errors.privacy = 'Please select a privacy setting';
            }
            break;

        case 6:
            if (!formData.design) {
                errors.design = 'Please select a capsule design';
            }
            break;

        default:
            break;
    }

    return errors;
};

    export const validateFile = (file) => {
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
        return `File type not supported. Allowed types: ${Object.values(ALLOWED_FILE_TYPES).flat().join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
        return `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`;
    }
    return null;
};