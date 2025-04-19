import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CommentModal = ({ isOpen, onClose, capsule }) => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const currentUserId = parseInt(localStorage.getItem('user_id'));
            const token = localStorage.getItem('access_token');

            await axios.post('http://127.0.0.1:8000/api/capsule-comments', {
                capsule_id: capsule.id,
                user_id: currentUserId,
                comment: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComment('');
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-background rounded-lg max-w-md w-full overflow-hidden shadow-xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-white/10">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-text">Add Comment</h3>
                        <button
                            onClick={onClose}
                            className="text-text/50 hover:text-text transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <p className="text-sm text-text/70 mb-2">Commenting on: <span className="font-medium text-text">{capsule.title}</span></p>
                    </div>

                    <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-text resize-none min-h-24"
                required
            />

                        {error && (
                            <div className="mt-2 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-text/70 hover:text-text mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !comment.trim()}
                                className={`px-4 py-2 rounded-lg bg-[#FF95DD] text-white ${
                                    isSubmitting || !comment.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF95DD]/90'
                                }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;