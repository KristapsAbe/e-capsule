import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const ImageAddons = ({ images, updateFormData }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageComment, setImageComment] = useState('');

    const selectImage = (index) => {
        setSelectedImage(index);
        setImageComment(images[index].comment || '');
    };

    const saveImageComment = () => {
        if (selectedImage !== null) {
            const updatedImages = images.map((img, index) =>
                index === selectedImage ? { ...img, comment: imageComment } : img
            );
            updateFormData({ images: updatedImages });
            setSelectedImage(null);
            setImageComment('');
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group aspect-square w-full"
                    >
                        <div className="w-full h-full relative">
                            <img
                                src={URL.createObjectURL(image.file)}
                                alt={`Uploaded ${index}`}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                onClick={() => selectImage(index)}
                            />
                            {image.comment && (
                                <div
                                    className="absolute bottom-2 right-2 text-green-500 bg-white bg-opacity-75 rounded-full p-1.5 sm:p-2 cursor-pointer hover:bg-opacity-100"
                                    onClick={() => selectImage(index)}
                                >
                                    <FontAwesomeIcon icon={faComment} className="text-sm sm:text-base" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage !== null && (
                <ImageCommentModal
                    image={images[selectedImage]}
                    comment={imageComment}
                    setComment={setImageComment}
                    onClose={() => {
                        setSelectedImage(null);
                        setImageComment('');
                    }}
                    onSave={saveImageComment}
                />
            )}
        </>
    );
};

const ImageCommentModal = ({ image, comment, setComment, onClose, onSave }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-background rounded-lg p-3 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-2 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-text">
                        Add Comment to Image
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-text hover:text-[#A3688F]"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="w-full sm:w-1/2">
                        <div className="aspect-square w-full relative">
                            <img
                                src={URL.createObjectURL(image.file)}
                                alt="Selected for comment"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 flex flex-col">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-grow p-2 sm:p-3 border rounded-lg border-[#A3688F] focus:outline-none focus:ring-2 focus:ring-[#A3688F] bg-background text-text resize-none mb-2 sm:mb-4 text-sm sm:text-base"
                            placeholder="Add your comment here..."
                            rows={6}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#A3688F] text-text hover:bg-[#A3688F] hover:text-white transition duration-300 text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onSave}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#A3688F] text-white rounded-full hover:bg-[#8A4B6A] transition duration-300 text-sm sm:text-base"
                            >
                                Save Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAddons;