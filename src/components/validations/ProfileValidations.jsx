export const validateProfileForm = (formData, t) => {
  const errors = {};

  const safeTrim = (value) => {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  };

  const firstName = safeTrim(formData.firstName);
  if (!firstName) {
    errors.firstName = t('firstNameRequired');
  } else if (firstName.length < 2) {
    errors.firstName = t('firstNameMinLength');
  } else if (firstName.length > 50) {
    errors.firstName = t('firstNameMaxLength');
  }

  const lastName = safeTrim(formData.lastName);
  if (!lastName) {
    errors.lastName = t('lastNameRequired');
  } else if (lastName.length < 2) {
    errors.lastName = t('lastNameMinLength');
  } else if (lastName.length > 50) {
    errors.lastName = t('lastNameMaxLength');
  }

  const email = safeTrim(formData.email);
  if (!email) {
    errors.email = t('emailRequired');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = t('invalidEmail');
  }

  const bio = safeTrim(formData.bio);
  if (bio && bio.length > 500) {
    errors.bio = t('bioMaxLength');
  }

  const newPassword = safeTrim(formData.newPassword);
  const confirmNewPassword = safeTrim(formData.confirmNewPassword);

  if (newPassword) {
    if (newPassword.length < 8) {
      errors.newPassword = t('passwordMinLength');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      errors.newPassword = t('passwordRequirements');
    }

    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = t('passwordsDoNotMatch');
    }
  } else if (confirmNewPassword) {
    errors.newPassword = t('enterNewPassword');
  }

  if (formData.image && formData.image.size > 2 * 1024 * 1024) { // 2MB
    errors.image = t('imageSizeExceeded');
  }

  return errors;
};