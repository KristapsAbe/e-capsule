import React from 'react';
import { renderError } from './renderError';

const TitleAndDescription = ({ formData, onChange, errors }) => {
    return (
        <>
            <p className='text-text font-regular text-lg sm:text-xl lg:text-2xl mt-2 sm:mt-4 pb-2 sm:pb-4'>
                TITLE
            </p>
            <input
                name="title"
                value={formData.title}
                onChange={onChange}
                className={`mb-4 w-full max-w-md uppercase p-1.5 sm:p-2 shadow-secondary rounded-[100px] font-light font-lexend bg-background text-center text-text text-sm sm:text-base lg:text-xl focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500' : 'border-[#A3688F]'} border-2`}
            />
            {renderError(errors.title)}

            <p className='text-text font-regular text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4'>
                DESCRIPTION
            </p>
            <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className={`mb-4 w-full max-w-md p-1.5 sm:p-2 resize-none h-24 sm:h-32 lg:h-[240px] shadow-secondary rounded-[10px] font-light font-lexend bg-background text-left text-text text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500' : 'border-[#A3688F]'} border-2`}
            ></textarea>
            {renderError(errors.description)}
        </>
    );
};

export default TitleAndDescription;