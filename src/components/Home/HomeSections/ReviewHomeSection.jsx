import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from "../../../LanguageContext";

const ReviewHomeSection = ({ fadeIn }) => {
    const { t } = useLanguage();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/api/high-rated-reviews');
                setReviews(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(t('failedToLoadActivity'));
                setLoading(false);
            }
        };

        fetchReviews();
    }, [t]);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    {...fadeIn}
                >
                    <h2 className="text-4xl font-bold mb-4">{t('storiesFromOur')} <span className="text-button">{t('community')}</span></h2>
                    <p className="text-primary text-lg max-w-3xl mx-auto">
                        {t('hearHowMemoryCapsules')}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center">
                        <p className="text-primary">{t('loadingTestimonials')}</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center">
                        <p className="text-primary">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-background border border-secondary/40 rounded-2xl p-6 shadow-secondary"
                                    initial={{opacity: 0, y: 30}}
                                    transition={{delay: 0.2 * (index % 3 + 1), duration: 0.7}}
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3"
                                        >
                                            <span className="text-text font-bold">{getInitials(review.user.name)}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{review.user.name}</h4>
                                            <p className="text-primary text-sm">{review.user.title || t('user')} • {review.user.location || ''}</p>
                                        </div>
                                    </div>
                                    <p className="text-primary">
                                        "{truncateText(review.comment)}"
                                    </p>
                                    <div className="flex mt-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className={`h-5 w-5 ${star <= review.rating ? 'text-button' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center">
                                <p className="text-primary">{t('noReviewsAvailable')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewHomeSection;