import React, { useState, useEffect, useCallback, useMemo, memo, Suspense } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUserPlus,
  faTimes,
  faCheck,
  faUserFriends,
  faClock,
  faUsers,
  faLock,
  faGlobe,
  faUserGroup,
  faChevronLeft,
  faChevronRight,
  faCapsules
} from '@fortawesome/free-solid-svg-icons';
import { Lock, Unlock, Star, BookOpen, Clock, Shield, Heart, Quote, MessageCircle, Camera, Package } from 'lucide-react';

const ImageWithFallback = memo(({ src, alt, onLoad, onError, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc('/images/DefaultAvatar.jpg');
    onError?.();
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={onLoad}
      loading="lazy"
      decoding="async"
      width="128"
      height="128"
    />
  );
});

const UserModal = memo(({ user, onClose, onSendRequest, isPending }) => {
  const [userCapsules, setUserCapsules] = useState([]);
  const [capsuleLoading, setCapsuleLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        setCapsuleLoading(true);
        setError(null);

        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const url = `http://127.0.0.1:8000/api/friends/${user.id}/capsules`;
        console.log('Fetching capsules from:', url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response:', response);

        if (response.data.status === 'success') {
          console.log('Capsules data:', response.data.data);

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
          console.error('Failed to fetch capsules:', response.data);
          setError('Failed to fetch capsules');
        }
      } catch (err) {
        console.error('Error fetching capsules:', err);
        console.error('Response data:', err.response?.data);
        setError(err.response?.data?.message || err.message);
      } finally {
        setCapsuleLoading(false);
      }
    };

    if (user) {
      fetchCapsules();
    }
  }, [user]);

  const getDesignStyles = (design) => {
    const styles = {
      heritage: {
        container: 'bg-gradient-to-br from-[#382330] to-[#5E3762] border-[#B2779F] text-[#E5E6F0]',
        header: 'text-[#E5E6F0] bg-black/40',
        accent: '#FFD700', // Gold
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
        accent: '#64DFDF', // Cyan
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
        accent: '#FF95DD', // Pink
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
        accent: '#A3E4DB', // Teal
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

  const CapsuleCard = ({ capsule }) => {
    const design = capsule.design || 'heritage';
    const styles = getDesignStyles(design);
    const isReady = capsule.daysLeft <= 0;
    const images = JSON.parse(capsule.images || '[]');
    const hasImages = images.length > 0;

    return (
        <div className={`relative rounded-lg border overflow-hidden mb-3 ${styles.contentBg}`}>
          <ThemeDecoration design={design} />

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
              {isReady ? (
                  <div className="flex items-center text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <Unlock size={12} style={{ color: styles.accent }} className="mr-1" />
                    <span style={{ color: styles.accent }}>Ready</span>
                  </div>
              ) : (
                  <div className="flex items-center text-xs px-2 py-1 rounded-full bg-black/30">
                    <Lock size={12} style={{ color: styles.accent }} className="mr-1" />
                    <span>{`${capsule.daysLeft}d`}</span>
                  </div>
              )}
            </div>
          </div>

          <div className="p-2 flex items-center">
            <div className="w-16 h-16 rounded overflow-hidden mr-3 relative bg-black/40">
              {hasImages ? (
                  <>
                    <img
                        src="/api/placeholder/64/64"
                        alt="Memory preview"
                        className={`w-full h-full object-cover blur-sm ${styles.filter}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera size={16} style={{ color: styles.accent }} />
                    </div>
                  </>
              ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package size={16} style={{ color: styles.accent }} />
                  </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-text/60 text-xs line-clamp-2">
                {capsule.description || "This memory is sealed until it's time to open it."}
              </p>
              <div className="mt-1 flex items-center text-text/50 text-xs">
                <Clock size={10} className="mr-1" />
                <span>
                {new Date(capsule.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              </div>
            </div>
          </div>
        </div>
    );
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

                    {!isFriend && (
                        <div className="text-white/70 mt-2 text-sm">
                          {isPending ? (
                              <p className="flex items-center">
                                <FontAwesomeIcon icon={faUserGroup} className="opacity-70 mr-2" />
                                Friend request pending
                              </p>
                          ) : (
                              <div className="flex items-center">
                                <span>Not friends yet</span>
                                <button
                                    onClick={onSendRequest}
                                    className="ml-2 px-3 py-1 bg-[#FF95DD] text-white rounded-lg text-xs hover:bg-[#FF95DD]/90 transition"
                                >
                                  Add Friend
                                </button>
                              </div>
                          )}
                        </div>
                    )}
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
              <FontAwesomeIcon icon={faCapsules} className="text-[#FF95DD] mr-2" />
              <h3 className="text-lg font-medium text-text/90">
                Memories {userCapsules.length > 0 ? `(${userCapsules.length})` : ''}
              </h3>
              {!isFriend && userCapsules.length > 0 &&
                  <span className="ml-2 text-xs text-text/50">(showing public only)</span>
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
                      <CapsuleCard key={capsule.id} capsule={capsule} />
                  ))}
                </div>
            ) : (
                <div className="text-center py-8 text-text/70">
                  <Package size={32} className="mx-auto mb-4 text-[#FF95DD] opacity-50" />
                  {isFriend ?
                      'No memories created yet' :
                      'No public memories available'
                  }
                </div>
            )}
          </div>
        </div>
      </div>
  );
});


const UserCard = memo(({
  user,
  onSelect,
  onSendRequest,
  isPending
}) => {
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
        {user.bio || 'No bio available'}
      </p>
      {user.is_friend ? (
        <span className="text-[#FF95DD] font-medium flex items-center gap-2">
          <FontAwesomeIcon icon={faUserFriends} />
          Already Friends
        </span>
      ) : user.friend_request_sent ? (
        <span className="text-[#FF95DD] font-medium flex items-center gap-2">
          <FontAwesomeIcon icon={faCheck} />
          Request Sent
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
            <span>Sending...</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Connect
            </>
          )}
        </button>
      )}
    </div>
  );
});

const SearchInput = memo(({ value, onChange }) => (
  <div className="relative w-full max-w-sm mb-6 sm:mb-12">
    <input
      type="text"
      placeholder="Search users..."
      className="w-full py-2 sm:py-3 px-4 sm:px-6 pr-10 rounded-full border-2 border-[#FF95DD] bg-background/50 text-text focus:outline-none focus:border-[#FF5CAA] transition-all duration-300"
      value={value}
      onChange={onChange}
    />
    <FontAwesomeIcon
      icon={faSearch}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FF95DD]"
    />
  </div>
));

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1 
            ? 'text-text/30 cursor-not-allowed' 
            : 'text-[#FF95DD] hover:bg-[#FF95DD]/10'
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <span className="font-lexend text-text">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages 
            ? 'text-text/30 cursor-not-allowed' 
            : 'text-[#FF95DD] hover:bg-[#FF95DD]/10'
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
});

const FriendsPage = () => {
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(new Set());
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();

  const USERS_PER_PAGE = 9;

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/friends`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              },
              signal: controller.signal
            }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setAllUsers(data);
          setTotalUsers(data.length);
        } else if (data.users && Array.isArray(data.users)) {
          setAllUsers(data.users);
          setTotalUsers(data.total || data.users.length);
        } else {
          setAllUsers([]);
          setTotalUsers(0);
          console.error('Unexpected API response structure:', data);
        }

        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching users:', error);
          setError(error.message);
          toast.error('Failed to load users: ' + error.message);
          setAllUsers([]);
          setTotalUsers(0);
        }
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, [navigate]);

  useEffect(() => {
    if (!Array.isArray(allUsers)) return;

    const searchLower = searchTerm.toLowerCase();
    const filtered = searchTerm
        ? allUsers.filter(user => user.name.toLowerCase().includes(searchLower))
        : allUsers;

    setTotalUsers(filtered.length);
    setTotalPages(Math.ceil(filtered.length / USERS_PER_PAGE));

    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    setUsers(filtered.slice(startIndex, endIndex));

    if (currentPage > Math.ceil(filtered.length / USERS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [allUsers, searchTerm, currentPage, USERS_PER_PAGE]);

  const filteredUsers = useMemo(() => {
    const filledArray = [...users];
    while (filledArray.length < USERS_PER_PAGE) {
      filledArray.push(null);
    }
    return filledArray;
  }, [users]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handleSendRequest = useCallback(async (targetUserId) => {
    setPendingRequests(prev => new Set(prev).add(targetUserId));

    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/friends/request', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_user_id: targetUserId,
        }),
      });

      if (!response.ok) throw new Error('Failed to send friend request');

      toast.success('Friend request sent');

      setAllUsers(prev =>
          prev.map(user =>
              user?.id === targetUserId
                  ? { ...user, friend_request_sent: true }
                  : user
          )
      );

      setUsers(prev =>
          prev.map(user =>
              user?.id === targetUserId
                  ? { ...user, friend_request_sent: true }
                  : user
          )
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error('Failed to send friend request');
    } finally {
      setPendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(targetUserId);
        return newSet;
      });
    }
  }, [navigate]);

  const handleUserSelect = useCallback((user) => {
    if (user) setSelectedUser(user);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const EmptyCard = memo(() => (
    <div className="bg-background/70 rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-lg h-full">
      <div className="w-20 h-20 sm:w-32 sm:h-32 mb-4 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
    </div>
  ));
  return (
      <div className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-8 py-12">
        <h1 className="text-text font-lexend font-bold text-2xl sm:text-4xl mb-6 sm:mb-12">
          Find Friends
        </h1>

        <SearchInput value={searchTerm} onChange={handleSearch} />

        <Suspense fallback={<div>Loading...</div>}>
          {isInitialLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {Array(USERS_PER_PAGE).fill(null).map((_, index) => (
                    <EmptyCard key={`loading-${index}`} />
                ))}
              </div>
          ) : error ? (
              <div className="text-red-500">{error}</div>
          ) : totalUsers === 0 ? (
              <div className="text-text/70">No users found</div>
          ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {filteredUsers.map((user, index) => (
                      user ? (
                          <UserCard
                              key={user.id}
                              user={user}
                              onSelect={handleUserSelect}
                              onSendRequest={handleSendRequest}
                              isPending={pendingRequests.has(user.id)}
                          />
                      ) : (
                          <EmptyCard key={`empty-${index}`} />
                      )
                  ))}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
              </>
          )}
        </Suspense>
        {selectedUser && (
            <UserModal
                user={selectedUser}
                onClose={handleCloseModal}
                onSendRequest={handleSendRequest}
                isPending={pendingRequests.has(selectedUser.id)}
            />
        )}
      </div>
  );
};


export default FriendsPage;