import React from 'react';
import { renderError } from './renderError';

const Vision = ({ vision, onChange, errors }) => {
    return (
        <>
            <p className='text-text font-regular text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4'>
                VISION
            </p>
            <textarea
                name="vision"
                value={vision}
                onChange={onChange}
                placeholder="Share your thoughts, expectations, or considerations for this time capsule..."
                className={`mb-4 w-full max-w-md p-1.5 sm:p-2 resize-none h-24 sm:h-32 lg:h-[240px] shadow-secondary rounded-[10px] font-light font-lexend bg-background text-left text-text text-sm sm:text-base lg:text-lg border-2 focus:outline-none focus:ring-2 ${errors.vision ? 'border-red-500' : 'border-[#A3688F]'}`}
            ></textarea>
            {renderError(errors.vision)}
        </>
    );
};

export default Vision;