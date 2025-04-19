import React, { useState, useEffect } from 'react';
import CapsuleTimeline from './Widgets/CapsuleTimeline';
import CreateCapsuleWidget from './Widgets/CreateCapsuleWidget';
import RecentActivityWidget from './Widgets/RecentActivityWidget';
import FriendsCapsuleWidget from './Widgets/FriendsCapsuleWidget';
import AllActivitiesModal from './Widgets/AllActivitiesModal';

function Dashboard() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [viewportHeight, setViewportHeight] = useState('100vh');
    const [showActivitiesModal, setShowActivitiesModal] = useState(false);
    const [activities, setActivities] = useState([]);
    const [showRecentActivity, setShowRecentActivity] = useState(true);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .timeline-scrollbar::-webkit-scrollbar-track {
                background: rgba(178, 119, 159, 0.1);
                border-radius: 10px;
            }
            .timeline-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(178, 119, 159, 0.3);
                border-radius: 10px;
            }
            .timeline-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 149, 221, 0.5);
            }
        `;
        document.head.appendChild(style);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);

            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            setViewportHeight(`calc(var(--vh, 1vh) * 100)`);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.head.removeChild(style);
        };
    }, []);

    const handleShowActivities = (activities) => {
        setActivities(activities);
        setShowActivitiesModal(true);
    };

    const handleCloseRecentActivity = () => {
        setShowRecentActivity(false);
    };

    return (
        <div className='min-h-screen w-full bg-background font-lexend flex flex-col bg-[radial-gradient(circle_at_bottom_left,rgba(178,119,159,0.05)_0%,rgba(94,55,98,0.05)_50%,rgba(13,14,22,1)_100%)]' style={{ minHeight: viewportHeight }}>
            <div className='w-full flex-grow flex flex-col lg:flex-row p-3 md:p-4 lg:p-6 relative'>
                {showActivitiesModal && (
                    <AllActivitiesModal
                        activities={activities}
                        onClose={() => setShowActivitiesModal(false)}
                    />
                )}

                <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/3'} 
                      flex ${isMobile || isTablet ? 'flex-col' : 'flex-col'} 
                      gap-3 md:gap-4 lg:gap-6 lg:pr-6 ${!isMobile && !isTablet ? 'h-[calc(100vh-3rem)]' : 'mb-3 md:mb-4'}`}>

                    {isMobile || isTablet ? (
                        <>
                            <div className='h-auto'>
                                <CreateCapsuleWidget />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
                                {showRecentActivity && (
                                    <div className='h-auto'>
                                        <RecentActivityWidget
                                            onViewAll={handleShowActivities}
                                            onClose={handleCloseRecentActivity}
                                        />
                                    </div>
                                )}

                                <div className={`h-auto ${!showRecentActivity && 'md:col-span-2'}`}>
                                    <FriendsCapsuleWidget />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex-1'>
                                <CreateCapsuleWidget />
                            </div>

                            {showRecentActivity && (
                                <div className='flex-1'>
                                    <RecentActivityWidget
                                        onViewAll={handleShowActivities}
                                        onClose={handleCloseRecentActivity}
                                    />
                                </div>
                            )}

                            <div className='flex-1'>
                                <FriendsCapsuleWidget />
                            </div>
                        </>
                    )}
                </div>

                <div className={`${isMobile || isTablet ? 'w-full' : 'w-2/3'} 
                      ${isMobile || isTablet ? 'h-auto' : 'h-[calc(100vh-3rem)]'}`}>
                    <div className="h-full">
                        <CapsuleTimeline />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;