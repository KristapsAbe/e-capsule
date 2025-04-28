import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../LanguageContext";
import { validateStep } from "../validations/CapsuleCreationValidation";
import TitleAndDescription from './CapsuleCreationComponents/TitleAndDescription';
import ImagesUpload from './CapsuleCreationComponents/ImagesUpload';
import DateAndTime from './CapsuleCreationComponents/DateAndTime';
import ImageAddons from './CapsuleCreationComponents/ImageAddons';
import Vision from './CapsuleCreationComponents/Vision';
import PrivacySettings from './CapsuleCreationComponents/PrivacySettings';
import CapsuleDesignSelector from '../Profile/ProfileComponents/CapsuleDesignSelector';
import CapsulePreview from './CapsuleCreationComponents/CapsulePreview';
import CapsuleSharing from './CapsuleCreationComponents/CapsuleSharing';

function CapsuleCreation() {
    const { t } = useLanguage();
    const steps = [
        t('titleAndDescription'),
        t('images'),
        t('timeAndDate'),
        t('imageAddons'),
        t('vision'),
        t('privacy'),
        t('capsuleDesign'),
        t('preview'),
        t('sharing')
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [stepErrors, setStepErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        time: new Date(),
        vision: '',
        privacy: 'private',
        design: 'default',
        sharedWith: []
    });
    const [attemptedNext, setAttemptedNext] = useState(false);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (attemptedNext) {
            const errors = validateStep(currentStep, formData, t);
            setStepErrors(errors);
        }
    }, [formData, currentStep, attemptedNext, t]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, time: date });
    };

    const handleNextStep = () => {
        setAttemptedNext(true);
        const errors = validateStep(currentStep, formData, t);
        setStepErrors(errors);

        if (Object.keys(errors).length === 0) {
            setCurrentStep(currentStep + 1);
            setAttemptedNext(false);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setAttemptedNext(false);
        }
    };

    const createCapsule = async () => {
        const errors = validateStep(currentStep, formData, t);
        if (Object.keys(errors).length > 0) {
            setStepErrors(errors);
            return;
        }

        const capsuleData = new FormData();
        formData.sharedWith.forEach((userId, index) => {
            capsuleData.append(`shared_with[${index}]`, userId);
        });

        formData.images.forEach((image, index) => {
            capsuleData.append(`images[${index}]`, image.file);
            capsuleData.append(`image_comments[${index}]`, image.comment || '');
        });

        capsuleData.append('title', formData.title);
        capsuleData.append('description', formData.description);
        capsuleData.append('time', formData.time.toISOString());
        capsuleData.append('vision', formData.vision);
        capsuleData.append('privacy', formData.privacy);
        capsuleData.append('design', formData.design);

        try {
            const response = await fetch('https://www.e-capsule.digital/backend/public/api/capsule/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: capsuleData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(e => ({ message: 'Could not parse error response' }));
                throw new Error(errorData.message || 'Failed to create capsule');
            }
            navigate('/profile');
        } catch (error) {
            setStepErrors({ submit: 'Failed to create capsule. Please try again.' });
        }
    };

    const updateFormData = (newData) => {
        setFormData(prevState => ({
            ...prevState,
            ...newData
        }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <TitleAndDescription
                        formData={formData}
                        onChange={handleInputChange}
                        errors={stepErrors}
                    />
                );
            case 1:
                return (
                    <ImagesUpload
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={stepErrors}
                        setStepErrors={setStepErrors}
                    />
                );
            case 2:
                return (
                    <DateAndTime
                        selectedDate={formData.time}
                        onDateChange={handleDateChange}
                        errors={stepErrors}
                    />
                );
            case 3:
                return (
                    <ImageAddons
                        images={formData.images}
                        updateFormData={updateFormData}
                    />
                );
            case 4:
                return (
                    <Vision
                        vision={formData.vision}
                        onChange={handleInputChange}
                        errors={stepErrors}
                    />
                );
            case 5:
                return (
                    <PrivacySettings
                        privacy={formData.privacy}
                        onChange={handleInputChange}
                        errors={stepErrors}
                    />
                );
            case 6:
                return (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-hidden">
                            <CapsuleDesignSelector
                                value={formData.design}
                                onChange={handleInputChange}
                                error={stepErrors.design}
                            />
                            {stepErrors.design && (
                                <div className="text-red-500 text-sm mt-2 flex items-center justify-center">
                                    {stepErrors.design}
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 7:
                return <CapsulePreview formData={formData} />;
            case 8:
                return (
                    <>
                        <CapsuleSharing
                            onShareSelectionChange={(selectedFriends) => updateFormData({ sharedWith: selectedFriends })}
                        />
                        {stepErrors.submit && (
                            <div className="text-red-500 text-sm mt-2 flex items-center justify-center">
                                {stepErrors.submit}
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen bg-background flex justify-center items-center p-2 sm:p-4 overflow-auto'>
            <div className='w-full max-w-6xl min-h-[600px] h-auto lg:h-[80vh] flex flex-col lg:flex-row bg-background rounded-xl shadow-custom'>
                <StepsSidebar
                    steps={steps}
                    currentStep={currentStep}
                />

                <div className='w-full lg:w-8/12 h-auto lg:h-full bg-transparent font-lexend text-center relative p-2 sm:p-4 lg:p-6'>
                    <h1 className='font-extrabold text-text pt-2 lg:pt-12 text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-8'>
                        {steps[currentStep]}
                    </h1>
                    <div className='mb-16'>
                        {renderStep()}
                    </div>

                    <NavigationButtons
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        onPrev={handlePrevStep}
                        onNext={handleNextStep}
                        onFinish={createCapsule}
                        t={t}
                    />
                </div>
            </div>
        </div>
    );
}

const StepsSidebar = ({ steps, currentStep }) => {
    return (
        <>
            <div className='hidden lg:block lg:w-4/12 h-full bg-transparent lg:border-r-accent lg:border-r-4 p-2 sm:p-4'>
                <h1 className='text-center flex text-[#FFD4F1] justify-center pt-12 text-4xl font-black font-lexend'>
                    E-CAPSULE
                </h1>
                <div className='flex flex-col justify-center text-left font-lexend text-text font-regular text-[20px] gap-y-4 m-4 mt-20'>
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <p className={`flex-grow ${currentStep === index ? 'font-bold' : 'opacity-70'}`}>
                                {step}
                            </p>
                            {index < currentStep && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-500 ml-2"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className='lg:hidden w-full bg-transparent px-4 py-2'>
                <h1 className='text-center text-[#FFD4F1] text-2xl font-black font-lexend mb-2'>
                    E-CAPSULE
                </h1>
                <div className='flex items-center justify-center gap-1'>
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 rounded-full transition-all duration-200 ${index === currentStep ? 'w-4 bg-[#A3688F]' : 'w-1 bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onFinish, t }) => {
    return (
        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-2 sm:space-x-4">
            {currentStep > 0 && (
                <button
                    className="font-lexend text-text font-extralight text-base sm:text-lg tracking-widest relative group px-2 sm:px-4"
                    onClick={onPrev}
                >
                    {t('previous') || 'Previous'}
                    <span className="absolute left-0 right-0 bottom-[-5px] h-[2px] w-0 bg-[#A3688F] transition-all group-hover:w-full"></span>
                </button>
            )}
            {currentStep < totalSteps - 1 && (
                <button
                    className="font-lexend text-text font-extralight text-base sm:text-lg tracking-widest relative group px-2 sm:px-4"
                    onClick={onNext}
                >
                    {t('next') || 'Next'}
                    <span className="absolute left-0 right-0 bottom-[-5px] h-[2px] w-0 bg-[#A3688F] transition-all group-hover:w-full"></span>
                </button>
            )}
            {currentStep === totalSteps - 1 && (
                <button
                    className="font-lexend text-white font-bold text-base sm:text-lg tracking-widest relative group bg-[#A3688F] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#8A4B6A] transition duration-300"
                    onClick={onFinish}
                >
                    {t('saveCapsule') || 'Save Capsule'}
                </button>
            )}
        </div>
    );
};

export default CapsuleCreation;