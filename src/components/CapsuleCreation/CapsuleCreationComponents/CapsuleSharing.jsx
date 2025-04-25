import React, { useState, useEffect, useCallback, memo } from 'react';
import { Check, X, User } from 'lucide-react';
import { useLanguage } from "../../../LanguageContext";

const CapsuleSharing = memo(({ onShareSelectionChange }) => {
  const { t } = useLanguage();
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('https://www.e-capsule.digital/backend/public/api/friends', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) throw new Error(t('failedToFetchFriends'));
        const data = await response.json();
        const acceptedFriends = data.filter(user => user.is_friend);
        setFriends(acceptedFriends);
      } catch (err) {
        setError(t('failedToFetchFriends'));
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [t]);

  const toggleFriendSelection = useCallback((friendId) => {
    setSelectedFriends(prev =>
        prev.includes(friendId)
            ? prev.filter(id => id !== friendId)
            : [...prev, friendId]
    );
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onShareSelectionChange(selectedFriends);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedFriends, onShareSelectionChange]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3688F]"></div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
    );
  }

  return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-left mb-4">
          <h3 className="text-lg font-medium text-text">{t('sharing')}</h3>
          <p className="text-sm text-gray-500">{t('chooseSpecificPeople')}</p>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {friends.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                {t('noFriendsFound')}
              </div>
          ) : (
              friends.map(friend => (
                  <FriendItem
                      key={friend.id}
                      friend={friend}
                      isSelected={selectedFriends.includes(friend.id)}
                      onToggle={toggleFriendSelection}
                  />
              ))
          )}
        </div>
      </div>
  );
});

const FriendItem = memo(({ friend, isSelected, onToggle }) => {
  const { t } = useLanguage();
  const [imgSrc, setImgSrc] = useState(friend.profile_image_url || null);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
    setImgSrc(`${process.env.PUBLIC_URL}/images/defaultAvatar.jpg`);
  };

  return (
      <div
          onClick={() => onToggle(friend.id)}
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
        ${isSelected
              ? 'bg-[#A3688F] bg-opacity-20'
              : 'hover:bg-[#A3688F] hover:bg-opacity-10'
          }`}
      >
        {imgSrc && !imgError ? (
            <img
                src={imgSrc}
                alt={friend.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={handleImageError}
            />
        ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
        )}
        <span className="ml-3 flex-grow text-text">{friend.name}</span>
        {isSelected ? (
            <Check className="w-5 h-5 text-[#A3688F]" />
        ) : (
            <X className="w-5 h-5 text-gray-300" />
        )}
      </div>
  );
});

CapsuleSharing.displayName = 'CapsuleSharing';
FriendItem.displayName = 'FriendItem';

export default CapsuleSharing;