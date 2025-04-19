import React from 'react';

const GradientBg = ({ children, className }) => (
    <div className={`bg-gradient-to-br from-secondary to-accent/50 ${className}`}>
        {children}
    </div>
);

export default GradientBg;