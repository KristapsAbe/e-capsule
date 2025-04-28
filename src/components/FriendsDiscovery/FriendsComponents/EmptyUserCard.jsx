import React, { memo } from 'react';

const EmptyUserCard = memo(() => (
    <div className="bg-background/70 rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-lg h-full">
        <div className="w-20 h-20 sm:w-32 sm:h-32 mb-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
    </div>
));

export default EmptyUserCard;