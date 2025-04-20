import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './components/DashBoard/DashBoard';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile/Profile';
import CapsuleCreation from './components/CapsuleCreation/CapsuleCreation';
import Friends from './components/FriendsDiscovery/FindFriends';
import NotificationSidebar from './components/NotificationSidebar';
import CapsuleAcceptModal from './components/CapsuleAcceptModal';
import Home from './components/Home/Home';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from "./LanguageContext";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, '');
  const shouldShowHeader = !['/login', '/register', '/email-verification'].includes(currentPath);

  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const handleCapsuleAccept = useCallback((capsuleData) => {
    return new Promise((resolve, reject) => {
      try {
        if (!capsuleData || !capsuleData.share_id) {
          reject(new Error('Invalid capsule data'));
          return;
        }
        setSelectedCapsule(capsuleData);
        setIsAcceptModalOpen(true);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const fetchFriendRequestCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/friends/requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      setNotificationCount(data.length);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  }, []);

  return (
      <div className="relative min-h-screen">
        <Toaster position="top-right" />
        {shouldShowHeader && (
            <Header
                notificationCount={notificationCount}
                onNotificationClick={() => setIsNotificationSidebarOpen(!isNotificationSidebarOpen)}
            />
        )}

        <NotificationSidebar
            isOpen={isNotificationSidebarOpen}
            onClose={() => setIsNotificationSidebarOpen(false)}
            onUpdateCount={setNotificationCount}
            onCapsuleAccept={handleCapsuleAccept}
            fetchFriendRequestCount={fetchFriendRequestCount}
        />

        {isAcceptModalOpen && selectedCapsule && (
            <CapsuleAcceptModal
                isOpen={isAcceptModalOpen}
                onClose={() => {
                  setIsAcceptModalOpen(false);
                  setSelectedCapsule(null);
                }}
                capsule={selectedCapsule}
                onAcceptComplete={() => {
                  setIsAcceptModalOpen(false);
                  setSelectedCapsule(null);
                }}
            />
        )}

        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/CapsuleCreation" element={<CapsuleCreation />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
  );
}

export default function AppWrapper() {
  return (
      <Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
  );
}