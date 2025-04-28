import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCapsules } from '@fortawesome/free-solid-svg-icons';
import { Package } from 'lucide-react';

import { useLanguage } from "../../../LanguageContext";
import ImageWithFallback from "./ImageWithFallback";
import { CapsuleCard } from './CapsuleCard';

const UserModal = memo(({ user, onClose, onSendRequest, isPending }) => {
    const { t } = useLanguage();
    const [userCapsules, setUserCapsules] = useState([]);
    const [capsuleLoading, setCapsuleLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFriend, setIsFriend] = useState(false);
    const [selectedCapsule, setSelectedCapsule] = useState(null);

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                setCapsuleLoading(true);
                setError(null);

                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No access token found');
                }

                const url = `https://www.e-capsule.digital/backend/public/api/friends/${user.id}/capsules`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.status === 'success') {
                    let capsuleArray = response.data.data;
                    if (!Array.isArray(capsuleArray) && typeof capsuleArray === 'object') {
                        capsuleArray = Object.values(capsuleArray);
                    }

                    const enhancedCapsules = capsuleArray.map(capsule => {
                        const createdDate = new Date(capsule.created_at);
                        const now = new Date();
                        const daysSinceCreation = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
                        const mockOpeningDays = 30; // Assuming capsules open after 30 days
                        const daysLeft = Math.max(0, mockOpeningDays - daysSinceCreation);

                        const designs = ['heritage', 'chronicle', 'legacy', 'vault'];
                        const design = capsule.design || designs[Math.floor(Math.random() * designs.length)];

                        return {
                            ...capsule,
                            daysLeft,
                            design
                        };
                    });

                    setUserCapsules(enhancedCapsules);

                    const hasFriendOnlyCapsules = capsuleArray.some(
                        capsule => capsule.privacy === 'friends'
                    );
                    setIsFriend(hasFriendOnlyCapsules);
                } else {
                    setError('Failed to fetch capsules');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setCapsuleLoading(false);
            }
        };

        if (user) {
            fetchCapsules();
        }
    }, [user]);

    const handleCloseComment = () => {
        setSelectedCapsule(null);
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
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3D2C40] to-[#5E3762]">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMjUsMjUgQzI1LDUwIDc1LDUwIDc1LDI1IiBzdHJva2U9IiNGRjk1REQyMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1LDc1IEMyNSw1MCA3NSw1MCA3NSw3NSIgc3Ryb2tlPSIjRkY5NUREMjAiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')]"></div>
                    </div>

                    <div className="relative p-6 backdrop-blur-sm">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center">
                                <div className="relative">
                                    <ImageWithFallback
                                        src={user.profile_image_url}
                                        alt={user.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-[#FF95DD]"
                                    />
                                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-white font-lexend font-bold text-2xl">
                                        {user.name}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faCapsules} className="text-[#FF95DD] mr-2"/>
                        <h3 className="text-lg font-medium text-text/90">
                            {t('memories')} {userCapsules.length > 0 ? `(${userCapsules.length})` : ''}
                        </h3>
                        {!isFriend && userCapsules.length > 0 &&
                            <span className="ml-2 text-xs text-text/50">{t('showingPublicOnly')}</span>
                        }
                    </div>

                    {capsuleLoading ? (
                        <div className="space-y-4 mt-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-sm bg-red-500/10 p-4 rounded-lg">
                            {error}
                        </div>
                    ) : userCapsules.length > 0 ? (
                        <div className="space-y-1">
                            {userCapsules.map((capsule) => (
                                <CapsuleCard
                                    key={capsule.id}
                                    capsule={capsule}
                                    setSelectedCapsule={setSelectedCapsule}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-text/70">
                            <Package size={32} className="mx-auto mb-4 text-[#FF95DD] opacity-50"/>
                            {isFriend ?
                                t('noMemoriesCreatedYet') :
                                t('noPublicMemoriesAvailable')
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default UserModal;