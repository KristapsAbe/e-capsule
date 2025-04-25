import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Clock, UserPlus, Timer, MessageSquare, ChevronLeft } from 'lucide-react';
import { useLanguage } from "../LanguageContext";

const NotificationSidebar = ({ isOpen, onClose, onUpdateCount, fetchFriendRequestCount, onCapsuleAccept }) => {
  const { t } = useLanguage();
  const [friendRequests, setFriendRequests] = useState([]);
  const [sharedCapsules, setSharedCapsules] = useState([]);
  const [activeTab, setActiveTab] = useState('friends');
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchFriendRequests = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('No access token found');
        return;
      }

      const response = await fetch('https://www.e-capsule.digital/backend/public/api/friends/requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch friend requests');

      const data = await response.json();
      setFriendRequests(data);
      onUpdateCount?.(data.length);
    } catch (error) {
    }
  }, [onUpdateCount]);

  const fetchSharedCapsules = useCallback(async () => {
    try {
      setError(null);
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.warn('No access token found');
        setError('Authentication required');
        return;
      }

      const response = await fetch('https://www.e-capsule.digital/backend/public/api/capsules/shared', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSharedCapsules(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message);
      setSharedCapsules([]);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchFriendRequests();
      fetchSharedCapsules();
    }
  }, [isOpen, fetchFriendRequests, fetchSharedCapsules]);

  const handleFriendRequest = async (requestId, action) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch(`https://www.e-capsule.digital/backend/public/api/friends/request/${requestId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Failed to ${action} friend request`);

      await fetchFriendRequests();
      await fetchFriendRequestCount();
    } catch (error) {
    }
  };

  const handleShareResponse = async (shareId, status) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const share = sharedCapsules.find(s => s.share_id === shareId);

      if (!share) {
        setError('Share not found');
        return;
      }

      if (status === 'accepted') {
        const capsuleData = {
          share_id: share.share_id,
          capsule_id: share.capsule_id,
          title: share.title,
          vision: share.vision || '',
          shared_by: share.shared_by,
          status: share.status
        };
        if (onCapsuleAccept) {
          onCapsuleAccept(capsuleData);
        } else {
        }
        return;
      }

      const response = await fetch(`https://www.e-capsule.digital/backend/public/api/capsules/share/${shareId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'declined',
          capsule_id: share.capsule_id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to decline capsule share');
      }

      fetchSharedCapsules();

    } catch (error) {
      setError(`Failed to handle capsule share: ${error.message}`);
    }
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
      <>
        {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={onClose}
            ></div>
        )}

        <motion.div
            animate={isOpen ? 'open' : 'closed'}
            className={`fixed top-0 right-0 h-full bg-background shadow-lg z-40 overflow-hidden ${
                isMobile ? 'w-full sm:w-80' : 'w-80'
            }`}
            initial="closed"
            variants={sidebarVariants}
        >
          <div className="flex flex-col h-full font-lexend">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              {isMobile && (
                  <button
                      className="mr-2 text-text hover:text-accent transition-colors"
                      onClick={onClose}
                  >
                    <ChevronLeft size={24} />
                  </button>
              )}
              <h2 className="font-bold text-xl text-text">{t('notifications')}</h2>
              <button
                  className="text-text hover:text-accent transition-colors"
                  onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b border-gray-200 text-accent">
              <button
                  className={`flex-1 py-2 px-4 ${activeTab === 'friends' ? 'border-b-2 border-blue-500 text-text' : ''}`}
                  onClick={() => setActiveTab('friends')}
              >
                {t('friendRequests')}
              </button>
              <button
                  className={`flex-1 py-2 px-4 ${activeTab === 'capsules' ? 'border-b-2 border-blue-500 text-text' : ''}`}
                  onClick={() => setActiveTab('capsules')}
              >
                {t('sharedCapsules')}
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {activeTab === 'friends' ? (
                  friendRequests.length > 0 ? (
                      friendRequests.map((request) => (
                          <motion.div
                              key={request.id}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              initial={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                <UserPlus className="text-blue-500" size={18} />
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm text-text">{request.user.name} {t('sentYouFriendRequest')}</p>
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                  <Clock className="mr-1" size={12} />
                                  {new Date(request.created_at).toLocaleString()}
                                </p>
                                <div className="mt-2 flex space-x-2">
                                  <button
                                      className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition-colors"
                                      onClick={() => handleFriendRequest(request.id, 'accept')}
                                  >
                                    {t('accept')}
                                  </button>
                                  <button
                                      className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-colors"
                                      onClick={() => handleFriendRequest(request.id, 'decline')}
                                  >
                                    {t('decline')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                      ))
                  ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center p-4">
                        <UserPlus size={48} className="text-gray-400" />
                        <p className="mt-4 text-lg font-medium">{t('noFriendRequests')}</p>
                      </div>
                  )
              ) : (
                  <>
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 border-b border-red-100">
                          <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {sharedCapsules.length > 0 ? (
                        sharedCapsules.map((share) => (
                            <motion.div
                                key={share.share_id}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                  <Timer className="text-purple-500" size={18} />
                                </div>
                                <div className="flex-grow">
                                  <p className="text-sm text-text">
                                    {share.shared_by} {t('sharedCapsuleWithYou')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 mt-1">
                                    {share.title}
                                  </p>
                                  {share.vision && (
                                      <p className="text-xs text-gray-600 mt-1 truncate">
                                        {t('vision')}: {share.vision}
                                      </p>
                                  )}
                                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                                    <Clock className="mr-1" size={12} />
                                    {new Date(share.created_at).toLocaleString()}
                                  </p>

                                  {share.status === 'pending' && (
                                      <div className="mt-2 flex space-x-2">
                                        <button
                                            className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition-colors"
                                            onClick={() => {
                                              handleShareResponse(share.share_id, 'accepted');
                                            }}
                                        >
                                          {t('accept')}
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-colors"
                                            onClick={() => handleShareResponse(share.share_id, 'declined')}
                                        >
                                          {t('decline')}
                                        </button>
                                      </div>
                                  )}

                                  {share.status !== 'pending' && (
                                      <p className="text-xs mt-2 capitalize text-gray-500">
                                        {t('status')}: {t(`status_${share.status}`)}
                                      </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center p-4">
                          <MessageSquare size={48} className="text-gray-400" />
                          <p className="mt-4 text-lg font-medium">{t('noSharedCapsules')}</p>
                        </div>
                    )}
                  </>
              )}
            </div>
          </div>
        </motion.div>
      </>
  );
};

export default NotificationSidebar;