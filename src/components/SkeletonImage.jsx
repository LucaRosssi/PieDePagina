import { useState } from 'react';

const ProductImage = ({src, alt}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="image-wrapper">
            {!loaded && (
                <div className="skeleton skeleton-image"></div>
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`product-image ${loaded ? "loaded" : ""}`}
            />
        </div>
    )
}

export default ProductImage