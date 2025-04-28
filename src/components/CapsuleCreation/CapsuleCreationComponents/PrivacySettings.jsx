import React from 'react';
import { renderError } from './renderError';

const PrivacySettings = ({ privacy, onChange, errors }) => {
    return (
        <>
            <p className='text-text font-regular text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4'>
                PRIVACY SETTINGS
            </p>
            <select
                name="privacy"
                value={privacy}
                onChange={onChange}
                className={`mb-4 w-full max-w-md p-1.5 sm:p-2 shadow-secondary rounded-[100px] font-light font-lexend bg-background text-center text-text text-sm sm:text-base lg:text-xl border-2 focus:outline-none focus:ring-2 ${errors.privacy ? 'border-red-500' : 'border-[#A3688F]'}`}
            >
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
                <option value="public">Public</option>
            </select>
            {renderError(errors.privacy)}
        </>
    );
};

export default PrivacySettings;