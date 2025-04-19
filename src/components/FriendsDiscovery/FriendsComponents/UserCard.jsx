import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserFriends, faCheck } from '@fortawesome/free-solid-svg-icons';
import ImageWithFallback from "./ImageWithFallback";
import { useLanguage } from "../../../LanguageContext";

const UserCard = memo(({
                           user,
                           onSelect,
                           onSendRequest,
                           isPending
                       }) => {
    const { t } = useLanguage();
    const handleClick = useCallback(() => {
        onSelect(user);
    }, [user, onSelect]);

    const handleSendRequest = useCallback((e) => {
        e.stopPropagation();
        if (!isPending && !user.friend_request_sent && !user.is_friend) {
            onSendRequest(user.id);
        }
    }, [user, isPending, onSendRequest]);

    return (
        <div
            className="bg-background/70 rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-4">
                <ImageWithFallback
                    src={user.profile_image_url}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#FF95DD]"
                />
            </div>
            <h2 className="text-text font-lexend font-bold text-lg sm:text-xl mb-2">{user.name}</h2>
            <p className="text-text/70 font-lexend text-xs sm:text-sm mb-4 line-clamp-2">
                {user.bio || t('noBioAvailable')}
            </p>
            {user.is_friend ? (
                <span className="text-[#FF95DD] font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserFriends} />
                    {t('alreadyFriends')}
                </span>
            ) : user.friend_request_sent ? (
                <span className="text-[#FF95DD] font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    {t('requestSent')}
                </span>
            ) : (
                <button
                    className={`bg-gradient-to-r from-[#FF95DD] to-[#FF5CAA] text-background font-lexend font-medium py-2 px-4 sm:px-6 rounded-full flex items-center hover:opacity-90 transition-opacity ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSendRequest}
                    disabled={isPending}
                >
                    {isPending ? (
                        <span>{t('sending')}</span>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            {t('connect')}
                        </>
                    )}
                </button>
            )}
        </div>
    );
});

export default UserCard;