import React, { useState, memo } from 'react';

const ImageWithFallback = memo(({ src, alt, onLoad, onError, className }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(`${process.env.PUBLIC_URL}/images/defaultAvatar.jpg`);
        onError?.();
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            onLoad={onLoad}
            loading="lazy"
            decoding="async"
            width="128"
            height="128"
        />
    );
});

export default ImageWithFallback;