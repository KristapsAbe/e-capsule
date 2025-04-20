import { useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "../../../LanguageContext";

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setRating(0);
        setComment("");
        onClose();
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleStarHover = (hoveredRating) => {
        setHoverRating(hoveredRating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300">
            <div className="bg-background border border-accent/30 rounded-2xl shadow-secondary w-full max-w-sm mx-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-button"></div>

                <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-button text-lg font-lexend tracking-wide">
                            {t('shareYourExperience')}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-primary hover:text-button transition-colors duration-200 rounded-full p-1 hover:bg-secondary/20"
                            aria-label={t('closeModal')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="rating" className="block text-text text-sm font-medium">
                                {t('howWouldYouRateExperience')}
                            </label>
                            <div
                                className="flex justify-center space-x-2 bg-secondary/10 p-3 rounded-xl border border-secondary/20 backdrop-blur-sm"
                                onMouseLeave={handleStarLeave}
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={28}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        className={`cursor-pointer transition-all duration-200 hover:scale-110 ${(hoverRating || rating) >= star ? 'drop-shadow-sm' : ''}`}
                                        fill={(hoverRating || rating) >= star ? "#FF95DD" : "transparent"}
                                        color={(hoverRating || rating) >= star ? "#FF95DD" : "#A7ACCD"}
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="comment" className="block text-text text-sm font-medium">
                                {t('shareYourThoughtsMemories')}
                            </label>
                            <div className="relative">
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-secondary/5 border border-secondary/30 rounded-xl p-3 text-text text-sm focus:outline-none focus:ring-1 focus:ring-button min-h-24 transition-all duration-200 focus:border-accent resize-none"
                                    placeholder={t('tellUsAboutExperience')}
                                />
                                <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-secondary/5"></div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={!rating || !comment.trim()}
                                className={`px-5 py-2 rounded-lg bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-button text-text text-sm shadow-b2779f-custom transition-all duration-200 font-medium ${
                                    !rating || !comment.trim() ? "opacity-50 cursor-not-allowed" : "transform hover:-translate-y-0.5"
                                }`}
                            >
                                {t('submitReview')}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="absolute top-10 left-0 w-16 h-16 rounded-full bg-accent/5 blur-xl"></div>
                <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-secondary/10 blur-lg"></div>
            </div>
        </div>
    );
}