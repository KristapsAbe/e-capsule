import React from 'react';
import Icon from '../VisualAspects/Icon';
import { useLanguage } from "../../../LanguageContext";
import { XIcon } from 'lucide-react';
const AllActivitiesModal = ({ activities, onClose }) => {
    const { t } = useLanguage();

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-accent/10 backdrop-blur-lg border border-accent/30 rounded-2xl shadow-secondary w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-accent/20 rounded-full blur-2xl -ml-8 -mb-8"></div>

                <div className="flex items-center p-4 border-b border-accent/20 relative z-10">
                    <div className="w-1 h-6 bg-button rounded-full mr-2"></div>
                    <h3 className="text-text font-bold">{t('allActivities')}</h3>
                    <button
                        onClick={onClose}
                        className="ml-auto bg-background/40 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-background/60 hover:text-red-500 transition-all"
                    >
                        <XIcon className="text-white" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-grow p-4 relative z-10">
                    {activities.length === 0 ? (
                        <div className="text-center text-primary/70 py-8">{t('noActivities')}</div>
                    ) : (
                        <div className="space-y-2">
                            {activities.map((activity, index) => {
                                const currentUserId = getCurrentUser();
                                const isCurrentUser = currentUserId && activity.user.id === currentUserId;
                                const actionKey = getActionTranslationKey(activity.action);

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center py-2 px-2 rounded-lg hover:bg-background/20 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className={`w-8 h-8 rounded-full ${isCurrentUser ? "bg-gradient-to-br from-button to-secondary" : "bg-secondary"} flex items-center justify-center mr-3 shadow-sm text-xs text-white font-medium`}>
                                            {activity.user.initials}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-text text-xs">
                                                <span className="font-bold">{isCurrentUser ? t('you') : activity.user.name}</span> {t(actionKey)} <span className="text-button">{activity.capsule.title}</span>
                                            </p>
                                            <p className="text-primary/70 text-xs">{activity.time_elapsed}</p>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center ml-1">
                                            <Icon name={getActivityIcon(activity.type)} className="text-white" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllActivitiesModal;