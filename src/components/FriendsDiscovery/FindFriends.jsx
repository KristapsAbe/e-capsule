import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useLanguage } from "../../LanguageContext";
import SearchInput from './FriendsComponents/SearchInput';
import Pagination from './FriendsComponents/Pagination';
import UserCard from './FriendsComponents/UserCard';
import UserModal from './FriendsComponents/UserModal';
import EmptyUserCard from './FriendsComponents/EmptyUserCard';

const FriendsPage = () => {
  const { t } = useLanguage();
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
            `https://www.e-capsule.digital/backend/public/api/friends`,
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
        }

        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
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
      const response = await fetch('https://www.e-capsule.digital/backend/public/api/friends/request', {
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

      toast.success(t('friendRequestSent'));

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
      toast.error(t('failedToSendRequest'));
    } finally {
      setPendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(targetUserId);
        return newSet;
      });
    }
  }, [navigate, t]);

  const handleUserSelect = useCallback((user) => {
    if (user) setSelectedUser(user);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return (
      <div className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-8 py-12">
        <h1 className="text-text font-lexend font-bold text-2xl sm:text-4xl mb-6 sm:mb-12">
          {t('findFriends')}
        </h1>

        <SearchInput value={searchTerm} onChange={handleSearch} />

        <Suspense fallback={<div>Loading...</div>}>
          {isInitialLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {Array(USERS_PER_PAGE).fill(null).map((_, index) => (
                    <EmptyUserCard key={`loading-${index}`} />
                ))}
              </div>
          ) : error ? (
              <div className="text-red-500">{error}</div>
          ) : totalUsers === 0 ? (
              <div className="text-text/70">{t('noUsersFound')}</div>
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
                          <EmptyUserCard key={`empty-${index}`} />
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