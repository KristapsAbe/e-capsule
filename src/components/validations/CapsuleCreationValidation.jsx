export const ALLOWED_FILE_TYPES = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'video/mp4': ['.mp4']
};

export const MAX_FILE_SIZE = 65536 * 1024;

export const validateStep = (step, formData, t) => {
    const errors = {};

    switch (step) {
        case 0:
            if (!formData.title?.trim()) {
                errors.title = t('titleRequired') || 'Title is required';
            } else if (formData.title.length > 255) {
                errors.title = t('titleTooLong') || 'Title must be less than 255 characters';
            }
            if (!formData.description?.trim()) {
                errors.description = t('descriptionRequired') || 'Description is required';
            }
            break;

        case 1:
            if (!formData.images || formData.images.length === 0) {
                errors.images = t('imagesRequired') || 'At least one image is required';
            }
            break;

        case 2:
            if (!formData.time) {
                errors.time = t('timeRequired') || 'Opening time is required';
            } else {
                const selectedTime = new Date(formData.time);
                const currentTime = new Date();
                if (selectedTime <= currentTime) {
                    errors.time = t('timeMustBeFuture') || 'Opening time must be in the future';
                }
            }
            break;

        case 4:
            if (!formData.vision?.trim()) {
                errors.vision = t('visionRequired') || 'Vision is required';
            }
            break;

        case 5:
            if (!formData.privacy || !['private', 'friends', 'public'].includes(formData.privacy)) {
                errors.privacy = t('privacyRequired') || 'Please select a privacy setting';
            }
            break;

        case 6:
            if (!formData.design) {
                errors.design = t('designRequired') || 'Please select a capsule design';
            }
            break;

        default:
            break;
    }

    return errors;
};

export const validateFile = (file, t) => {
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
        return t('fileTypeNotSupported', { types: Object.values(ALLOWED_FILE_TYPES).flat().join(', ') }) ||
            `File type not supported. Allowed types: ${Object.values(ALLOWED_FILE_TYPES).flat().join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
        return t('fileSizeTooLarge', { size: MAX_FILE_SIZE / 1024 / 1024 }) ||
            `File size must be less than 64MB`;
    }
    return null;
};