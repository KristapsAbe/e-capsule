import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CapsuleCreation from './pages/CapsuleCreation';
import Friends from './pages/FindFriends';
import NotificationSidebar from './components/NotificationSidebar';
import CapsuleAcceptModal from './components/CapsuleAcceptModal';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
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
        console.log('handleCapsuleAccept called with:', capsuleData);
        if (!capsuleData || !capsuleData.share_id) {
          reject(new Error('Invalid capsule data'));
          return;
        }
        setSelectedCapsule(capsuleData);
        setIsAcceptModalOpen(true);
        resolve();
      } catch (error) {
        console.error('Error in handleCapsuleAccept:', error);
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

  useEffect(() => {
    console.log('Modal state changed:', { isAcceptModalOpen, selectedCapsule });
  }, [isAcceptModalOpen, selectedCapsule]);

  // Create a single instance of NotificationSidebar component
  const notificationSidebar = (
      <NotificationSidebar
          isOpen={isNotificationSidebarOpen}
          onClose={() => setIsNotificationSidebarOpen(false)}
          onUpdateCount={setNotificationCount}
          onCapsuleAccept={handleCapsuleAccept}
          fetchFriendRequestCount={fetchFriendRequestCount}
      />
  );

  // Create a single instance of CapsuleAcceptModal component
  const capsuleAcceptModal = isAcceptModalOpen && selectedCapsule && (
      <CapsuleAcceptModal
          isOpen={isAcceptModalOpen}
          onClose={() => {
            console.log('Modal closing');
            setIsAcceptModalOpen(false);
            setSelectedCapsule(null);
          }}
          capsule={selectedCapsule}
          onAcceptComplete={() => {
            console.log('Accept complete');
            setIsAcceptModalOpen(false);
            setSelectedCapsule(null);
          }}
      />
  );

  return (
      <div className="relative min-h-screen">
        <Toaster position="top-right" />
        {shouldShowHeader && (
            <Header
                notificationCount={notificationCount}
                onNotificationClick={() => setIsNotificationSidebarOpen(true)}
            />
        )}

        <Routes>
          <Route path="/dashboard" element={
            <>
              <DashBoard />
              {notificationSidebar}
              {capsuleAcceptModal}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <>
              <Profile />
              {notificationSidebar}
              {capsuleAcceptModal}
            </>
          } />
          <Route path="/CapsuleCreation" element={
            <>
              <CapsuleCreation />
              {notificationSidebar}
              {capsuleAcceptModal}
            </>
          } />
          <Route path="/friends" element={
            <>
              <Friends />
              {notificationSidebar}
              {capsuleAcceptModal}
            </>
          } />
        </Routes>
      </div>
  );
}

export default function AppWrapper() {
  return (
      <Router>
        <App />
      </Router>
  );
}