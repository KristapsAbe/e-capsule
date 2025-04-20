import React, { useState, useEffect } from 'react';
import Icon from '../VisualAspects/Icon';
import axios from 'axios';
import { useLanguage } from "../../../LanguageContext";

const RecentActivityWidget = ({ onViewAll, onClose }) => {
    const { t } = useLanguage();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/api/activities/comments');
                setActivities(response.data.activities);
                setLoading(false);
            } catch (err) {
                setError(t('failedToLoadActivity'));
                setLoading(false);
            }
        };

        fetchActivities();
    }, [t]);

    const getActivityIcon = (type) => {
        switch (type) {
            case 'comment':
                return 'comment';
            case 'create':
                return 'edit';
            case 'share':
                return 'share';
            case 'add':
                return 'plus';
            default:
                return 'activity';
        }
    };

    const getActionTranslationKey = (action) => {
        const actionMappings = {
            'commented on': 'commentedOn',
            'created': 'created',
            'shared': 'shared',
            'added to': 'addedTo',
            'modified': 'modified',
            'deleted': 'deleted',
            'viewed': 'viewed'
        };

        return actionMappings[action] || action;
    };

    const getCurrentUser = () => {
        const userId = document.querySelector('meta[name="user-id"]')?.content;
        return userId ? parseInt(userId) : null;
    };

    return (
        <div className='bg-accent/10 backdrop-blur-lg p-5 rounded-2xl shadow-secondary h-full flex flex-col border border-accent/30 relative overflow-hidden'>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl -ml-5 -mb-5"></div>

            <div className='flex items-center mb-4'>
                <div className="w-1 h-6 bg-button rounded-full mr-2"></div>
                <h3 className='text-text font-bold'>{t('recentActivity')}</h3>
                <div className="flex gap-2 ml-auto">
                    <button className='bg-background/40 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-background/60 transition-all'>
                        <Icon name="bell" className="text-white" />
                    </button>
                </div>
            </div>

            <div className='flex-grow'>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-6 h-6 border-2 border-button border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-4">{error}</div>
                ) : activities.length === 0 ? (
                    <div className="text-center text-primary/70 py-4">{t('noRecentActivity')}</div>
                ) : (
                    activities.slice(0, 5).map((activity, index) => {
                        const currentUserId = getCurrentUser();
                        const isCurrentUser = currentUserId && activity.user.id === currentUserId;
                        const actionKey = getActionTranslationKey(activity.action);

                        return (
                            <div key={index} className='flex items-center py-2 border-b border-accent/20 hover:bg-background/20 px-2 rounded-lg transition-all duration-200 cursor-pointer'>
                                <div className={`w-8 h-8 rounded-full ${isCurrentUser ? "bg-gradient-to-br from-button to-secondary" : "bg-secondary"} flex items-center justify-center mr-3 shadow-sm text-xs text-white font-medium`}>
                                    {activity.user.initials}
                                </div>
                                <div className='flex-grow'>
                                    <p className='text-text text-xs'>
                                        <span className='font-bold'>{isCurrentUser ? t('you') : activity.user.name}</span> {t(actionKey)} <span className='text-button'>{activity.capsule.title}</span>
                                    </p>
                                    <p className='text-primary/70 text-xs'>{activity.time_elapsed}</p>
                                </div>
                                <div className='w-6 h-6 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center ml-1'>
                                    <Icon name={getActivityIcon(activity.type)} className="text-white" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <button
                onClick={() => onViewAll(activities)}
                className='text-button text-xs font-bold w-full text-center mt-4 py-2 border-t border-accent/20 hover:bg-background/20 rounded-lg transition-all'
            >
                {t('viewAllActivity')}
            </button>
        </div>
    );
};

export default RecentActivityWidget;