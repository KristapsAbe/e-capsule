import React from 'react';
import CustomCalendar from './CustomCalendar';
import { renderError } from './renderError';

const DateAndTime = ({ selectedDate, onDateChange, errors }) => {
    return (
        <>
            <p className='text-text font-regular text-lg sm:text-xl mt-2 sm:mt-4 mb-2 sm:mb-4'>
                Set Time and Date for Capsule Opening
            </p>
            <div className="flex flex-col items-center">
                <CustomCalendar
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                />
                {renderError(errors.time)}
            </div>
        </>
    );
};

export default DateAndTime;