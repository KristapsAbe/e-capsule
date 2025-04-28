import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const renderError = (error) => {
    if (!error) return null;
    return (
        <div className="text-red-500 text-sm mt-2 flex items-center justify-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            <span>{error}</span>
        </div>
    );
};