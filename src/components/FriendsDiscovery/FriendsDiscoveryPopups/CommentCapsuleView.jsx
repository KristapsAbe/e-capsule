import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faComment, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { MessageSquare } from 'lucide-react';
import axios from 'axios';

const CommentCapsuleView = ({ isOpen, onClose, capsule }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && capsule) {
            fetchComments();
        }
    }, [isOpen, capsule]);

    const fetchComments = async () => {
        if (!capsule || !capsule.id) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.get(`https://www.e-capsule.digital/backend/public/api/capsule-comments/${capsule.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setComments(response.data.comments);
        } catch (err) {
            setError('Unable to load comments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !capsule) return null;

    const design = capsule.design || 'heritage';
    const styles = typeof getDesignStyles === 'function' ? getDesignStyles(design) : { accent: '#B2779F' };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-background rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center">
                        <MessageSquare size={18} style={{ color: styles.accent }} className="mr-2" />
                        <h3 className="text-lg font-medium text-text">
                            Comments on "{capsule.title}"
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="p-4 max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="space-y-4 py-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-start space-x-3 animate-pulse">
                                    <div className="w-10 h-10 rounded-full bg-white/10"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                                        <div className="h-10 bg-white/10 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-sm bg-red-500/10 p-4 rounded-lg mt-4">
                            {error}
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-4 py-2">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                    {comment.user.profile_image_url ? (
                                        <img
                                            src={comment.user.profile_image_url}
                                            alt={comment.user.name}
                                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center border border-white/10">
                                            <FontAwesomeIcon icon={faUser} className="text-text/70" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0"> {/* Added min-w-0 to enable text wrapping */}
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-text truncate max-w-[120px]">{comment.user.name}</span>
                                            <div className="text-xs text-text/50 flex items-center shrink-0">
                                                <FontAwesomeIcon icon={faClock} className="mr-1" />
                                                {formatDate(comment.created_at)}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg text-text/90 break-words">
                                            {comment.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-text/70">
                            <FontAwesomeIcon icon={faComment} className="text-3xl mb-3 opacity-30" />
                            <p>No comments yet</p>
                            <button
                                onClick={onClose}
                                className="mt-3 px-4 py-2 rounded-lg bg-button text-white text-sm hover:bg-button/90 transition"
                            >
                                Be the first to comment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentCapsuleView;