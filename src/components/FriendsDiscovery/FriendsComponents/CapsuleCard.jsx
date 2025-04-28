import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faGlobe, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Unlock, Star, BookOpen, Heart, Shield, Clock, Package, MessageSquare, MessageSquarePlus } from 'lucide-react';
import { useLanguage } from "../../../LanguageContext";
import CommentModal from '../FriendsDiscoveryPopups/CommentModal';
import CommentCapsuleView from '../FriendsDiscoveryPopups/CommentCapsuleView';

const ThemeDecoration = ({ design }) => {
    const styles = getDesignStyles(design);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            <div className={`absolute inset-0 ${styles.pattern} opacity-30`} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30 animate-pulse" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
    );
};

const getDesignStyles = (design) => {
    const styles = {
        heritage: {
            container: 'bg-gradient-to-br from-[#382330] to-[#5E3762] border-[#B2779F] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#FFD700',
            secondaryColor: '#B2779F',
            contentBg: 'bg-black/30 border-[#B2779F]/50',
            filter: 'brightness-95 contrast-110',
            icon: <Star className="text-[#FFD700]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEwLDEwIEwzMCwxMCBMMzAsMzAgTDEwLDMwIFoiIHN0cm9rZT0iI0ZGRDcwMDIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
            boxShadow: '0 10px 25px -5px rgba(178, 119, 159, 0.4)',
        },
        chronicle: {
            container: 'bg-gradient-to-r from-[#0D0E16] to-[#193A5A] border-[#64DFDF] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#64DFDF',
            secondaryColor: '#A7ACCD',
            contentBg: 'bg-black/30 border-[#64DFDF]/50',
            filter: 'brightness-95 saturate-105',
            icon: <BookOpen className="text-[#64DFDF]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgeD0iMjkiIHk9IjI5IiBmaWxsPSIjNjRERkRGMzAiLz48L3N2Zz4=")]',
            boxShadow: '0 0 30px -5px rgba(100, 223, 223, 0.5)',
        },
        legacy: {
            container: 'bg-gradient-to-br from-[#3D2C40] to-[#5E3762] border-[#FF95DD] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#FF95DD',
            secondaryColor: '#FF95DD',
            contentBg: 'bg-black/30 border-[#FF95DD]/50',
            filter: 'brightness-100 contrast-110',
            icon: <Heart className="text-[#FF95DD]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMjUsMjUgQzI1LDUwIDc1LDUwIDc1LDI1IiBzdHJva2U9IiNGRjk1REQyMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1LDc1IEMyNSw1MCA3NSw1MCA3NSw3NSIgc3Ryb2tlPSIjRkY5NUREMjAiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==")]',
            boxShadow: '0 10px 25px -5px rgba(255, 149, 221, 0.3)',
        },
        vault: {
            container: 'bg-gradient-to-r from-[#1A3A4A] to-[#30637C] border-[#A3E4DB] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#A3E4DB',
            secondaryColor: '#A3688F',
            contentBg: 'bg-black/30 border-[#A3E4DB]/50',
            filter: 'brightness-95 contrast-110',
            icon: <Shield className="text-[#A3E4DB]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwLDEwIEwxMCwzMCBMMzAsNTAgTDUwLDMwIFoiIHN0cm9rZT0iI0EzRTREQjIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
            boxShadow: '0 10px 25px -5px rgba(163, 228, 219, 0.3)',
        }
    };
    return styles[design] || styles.heritage;
};

const getDesignIcon = (design) => {
    const iconMap = {
        'heritage': <Star className="text-[#FFD700]" size={18} />,
        'chronicle': <BookOpen className="text-[#64DFDF]" size={18} />,
        'legacy': <Heart className="text-[#FF95DD]" size={18} />,
        'vault': <Shield className="text-[#A3E4DB]" size={18} />
    };
    return iconMap[design] || iconMap.heritage;
};

const getPrivacyIcon = (privacy) => {
    switch(privacy) {
        case 'private': return faLock;
        case 'friends': return faUserGroup;
        case 'public': return faGlobe;
        default: return faGlobe;
    }
};

const CapsuleCard = ({ capsule, setSelectedCapsule }) => {
    const { t } = useLanguage();
    const design = capsule.design || 'heritage';
    const styles = getDesignStyles(design);
    const isReady = capsule.daysLeft <= 0;
    const images = JSON.parse(capsule.images || '[]');
    const hasImages = images.length > 0;
    const [commentMode, setCommentMode] = useState('add');
    const [isCommentViewOpen, setIsCommentViewOpen] = useState(false);
    const [localSelectedCapsule, setLocalSelectedCapsule] = useState(null);
    const [imageError, setImageError] = useState(false);

    const imageBaseUrl = 'https://www.e-capsule.digital/backend/public/storage/';

    const handleCapsuleClick = (e) => {
        e.stopPropagation();
        if (isReady) {
        }
    };

    const handleAddComment = (e) => {
        e.stopPropagation();
        setCommentMode('add');
        setLocalSelectedCapsule(capsule);
    };

    const handleCloseComment = () => {
        setLocalSelectedCapsule(null);
    };

    const handleViewComments = (e) => {
        e.stopPropagation();
        setIsCommentViewOpen(true);
    };

    const handleCloseCommentView = () => {
        setIsCommentViewOpen(false);
    };

    return (
        <div
            className={`relative rounded-lg border overflow-hidden mb-3 ${styles.contentBg} ${isReady ? 'cursor-pointer' : ''}`}
            onClick={isReady ? handleCapsuleClick : undefined}
        >
            <ThemeDecoration design={design}/>

            <div className="flex justify-between items-center p-3">
                <div className="flex items-center space-x-2">
                    {getDesignIcon(design)}
                    <p className="text-text font-medium truncate">{capsule.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={getPrivacyIcon(capsule.privacy)}
                        className="text-text/50"
                        title={`Privacy: ${capsule.privacy}`}
                    />

                    <div className="flex items-center text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        <Unlock size={12} style={{color: styles.accent}} className="mr-1"/>
                        <span style={{color: styles.accent}}>{t('ready')}</span>
                    </div>
                </div>
            </div>

            <div className="p-2 flex items-center">
                <div className="w-16 h-16 rounded overflow-hidden mr-3 relative bg-black/40">
                    {hasImages && images.length > 0 && !imageError ? (
                        <img
                            src={`${imageBaseUrl}${images[0]}`}
                            alt="Memory preview"
                            className={`w-full h-full object-cover blur-sm ${styles.filter}`}
                            onError={(e) => {
                                setImageError(true);
                                e.target.onerror = null;
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={16} style={{color: styles.accent}}/>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-text/60 text-xs line-clamp-2">
                        {capsule.description || t('thisMemoryIsSealed')}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center text-text/50 text-xs">
                            <Clock size={10} className="mr-1"/>
                            <span>
                {new Date(capsule.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
              </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleAddComment}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                title={t('addComment')}
                            >
                                <MessageSquarePlus size={14} style={{color: styles.accent}}/>
                            </button>
                            <button
                                onClick={handleViewComments}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                title={t('viewComments')}
                            >
                                <MessageSquare size={14} style={{color: styles.accent}}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CommentModal
                isOpen={localSelectedCapsule !== null}
                onClose={handleCloseComment}
                capsule={localSelectedCapsule}
            />

            <CommentCapsuleView
                isOpen={isCommentViewOpen}
                onClose={handleCloseCommentView}
                capsule={capsule}
            />
        </div>
    );
};

export { CapsuleCard, ThemeDecoration, getDesignStyles, getDesignIcon, getPrivacyIcon };