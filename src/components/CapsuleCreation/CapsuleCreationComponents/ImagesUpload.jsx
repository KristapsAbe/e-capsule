import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { validateFile, ALLOWED_FILE_TYPES } from "../../validations/CapsuleCreationValidation";
import { renderError } from './renderError';

const ImagesUpload = ({ formData, updateFormData, errors, setStepErrors }) => {
    const handleImageSelection = (e) => {
        const files = Array.from(e.target.files);
        const fileErrors = [];
        const validFiles = [];

        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                fileErrors.push({ file: file.name, error });
            } else {
                validFiles.push({ file, comment: '' });
            }
        });

        if (fileErrors.length > 0) {
            setStepErrors({ images: fileErrors.map(f => `${f.file}: ${f.error}`).join(', ') });
            return;
        }

        updateFormData({
            images: [...formData.images, ...validFiles]
        });

        setStepErrors({});
    };

    const removeImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        updateFormData({ images: updatedImages });
    };

    return (
        <>
            <p className='text-text font-regular text-lg sm:text-xl lg:text-2xl mt-4 sm:mt-8 pb-2 sm:pb-4 uppercase'>
                Upload Images
            </p>
            <label
                htmlFor="images"
                className={`w-full max-w-xs mx-auto flex justify-center items-center p-1.5 sm:p-2 shadow-secondary rounded-[100px] font-light font-lexend bg-background text-center text-text text-sm sm:text-base lg:text-xl border-2 cursor-pointer hover:bg-[#A3688F] hover:text-white transition duration-300 ${errors.images ? 'border-red-500' : 'border-[#A3688F]'}`}
            >
                Choose Images
            </label>
            <input
                id="images"
                type="file"
                name="images"
                multiple
                onChange={handleImageSelection}
                className='hidden'
                accept={Object.values(ALLOWED_FILE_TYPES).flat().join(',')}
            />
            {renderError(errors.images)}

            <div className="mt-4 sm:mt-8 w-full max-w-md mx-auto">
                <table className="w-full text-left text-sm sm:text-base">
                    <tbody>
                    {formData.images.map((image, index) => (
                        <tr key={index} className="border-t border-[#A3688F] text-text">
                            <td className="p-1.5 sm:p-2">{image.file.name}</td>
                            <td className="p-1.5 sm:p-2">
                                <button
                                    onClick={() => removeImage(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ImagesUpload;