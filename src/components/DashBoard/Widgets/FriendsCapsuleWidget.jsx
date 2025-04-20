import React, { useState, useEffect } from 'react';
import Icon from '../VisualAspects/Icon';
import axios from 'axios';
import { useLanguage } from "../../../LanguageContext";
import InviteFriendsButton from './InviteFriendsButton';

const FriendsCapsuleWidget = () => {
    const { t } = useLanguage();
    const [friendsCapsules, setFriendsCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriendsCapsules = async () => {
            try {
                const token = localStorage.getItem('access_token');

                if (!token) {
                    setError(t('authTokenNotFound'));
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/friends/capsules', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFriendsCapsules(response.data);
                setLoading(false);
            } catch (err) {
                setError(t('failedToFetchFriends'));
                setLoading(false);
            }
        };

        fetchFriendsCapsules();
    }, [t]);

    if (loading) {
        return (
            <div className='bg-accent/10 backdrop-blur-lg p-5 rounded-2xl shadow-secondary h-full flex items-center justify-center'>
                <div className="text-text">{t('loadingFriendsData')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-accent/10 backdrop-blur-lg p-5 rounded-2xl shadow-secondary h-full flex items-center justify-center'>
                <div className="text-text">{error}</div>
            </div>
        );
    }

    return (
        <div className='bg-accent/10 backdrop-blur-lg p-5 rounded-2xl shadow-secondary h-full flex flex-col border border-accent/30 relative overflow-hidden'>
            <div className="absolute top-1/2 right-0 w-24 h-24 bg-button/10 rounded-full blur-2xl -mr-5"></div>

            <div className='flex items-center mb-4'>
                <div className="w-1 h-6 bg-button rounded-full mr-2"></div>
                <h3 className='text-text font-bold'>{t('friendsCapsules')}</h3>
                <button className='ml-auto bg-background/40 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-background/60 transition-all'>
                    <Icon name="group" />
                </button>
            </div>

            <div className='flex-grow'>
                {friendsCapsules.length > 0 ? (
                    friendsCapsules.map((friend) => (
                        <div key={friend.id} className='flex items-center justify-between py-2 border-b border-accent/20 hover:bg-background/20 px-2 rounded-lg transition-all duration-200 cursor-pointer'>
                            <div className='flex items-center'>
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3 shadow-sm relative`}>
                                    {friend.profile_image_url ? (
                                        <img src={friend.profile_image_url} alt={friend.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-white font-medium">{friend.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <span className='text-text'>{friend.name}</span>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex flex-col items-end'>
                                    <span className='text-text text-xs'>{friend.capsules} {t('capsules')}</span>
                                    <span className='text-button text-xs flex items-center'>
                                        {friend.shared} {t('shared')}
                                        <Icon className="ml-1 text-xs" name="star" />
                                    </span>
                                </div>
                                <button className='ml-2 w-6 h-6 rounded-full bg-gradient-to-br from-button to-btnOutline flex items-center justify-center shadow-sm hover:shadow-button/30 transition-all'>
                                    <Icon name="heart" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-text/70">
                        {t('noFriendsFound')}
                    </div>
                )}
            </div>

            <InviteFriendsButton t={t} />
        </div>
    );
};

export default FriendsCapsuleWidget;