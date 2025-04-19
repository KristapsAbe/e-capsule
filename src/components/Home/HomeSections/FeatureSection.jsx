import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../../../LanguageContext";

export default function FeatureSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('personal');

    const fadeIn = {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: 30 },
        transition: { duration: 0.8 }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    {...fadeIn}
                >
                    <h2 className="text-4xl font-bold mb-4">
                        {t('yourMemories')} <span className="text-button">{t('yourWay')}</span>
                    </h2>
                    <p className="text-primary text-lg max-w-3xl mx-auto">
                        {t('personalizeDigitalCapsules')}
                    </p>
                </motion.div>

                <div className="flex justify-center mb-12">
                    <div className="flex p-1 bg-secondary/20 rounded-full">
                        <motion.button
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'personal' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('personal')}
                        >
                            {t('personal')}
                        </motion.button>
                        <motion.button
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'family' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('family')}
                        >
                            {t('family')}
                        </motion.button>
                        <motion.button
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'friends' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('friends')}
                        >
                            {t('friends')}
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        {activeTab === 'personal' && (
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-bold mb-4">{t('personalGrowthJourney')}</h3>
                                <p className="text-primary mb-6">
                                    {t('documentAchievements')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('setGoals')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('createPrivateJournals')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('trackJourney')}</span>
                                    </li>
                                </ul>
                            </motion.div>
                        )}

                        {activeTab === 'family' && (
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-bold mb-4">{t('familyHeritagePreservation')}</h3>
                                <p className="text-primary mb-6">
                                    {t('createSharedCapsules')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('recordFamilyStories')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('collaborateOnFamily')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('createTimeCapsules')}</span>
                                    </li>
                                </ul>
                            </motion.div>
                        )}

                        {activeTab === 'friends' && (
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-bold mb-4">{t('friendGroupMemories')}</h3>
                                <p className="text-primary mb-6">
                                    {t('buildSharedCapsules')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('documentGroupTrips')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('createCapsulesForOccasions')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                            <svg
                                                className="h-4 w-4 text-button"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-primary">{t('shareAndCollectMemories')}</span>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-80 md:h-96 relative rounded-2xl overflow-hidden shadow-secondary flex items-center justify-center bg-secondary/5">
                            {activeTab === 'personal' && (
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    className="w-full h-full flex items-center justify-center"
                                    exit={{ opacity: 0 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/PersonalPhoto2.jpg`}
                                        alt="Personal memories"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                </motion.div>
                            )}

                            {activeTab === 'family' && (
                                <motion.div
                                    animate={{opacity: 1}}
                                    className="w-full h-full flex items-center justify-center"
                                    exit={{opacity: 0}}
                                    initial={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/MemoriesFamily.jpg`}
                                        alt="Family memories"
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                </motion.div>
                            )}

                            {activeTab === 'friends' && (
                                <motion.div
                                    animate={{opacity: 1}}
                                    className="w-full h-full flex items-center justify-center"
                                    exit={{opacity: 0}}
                                    initial={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/FriendsMemory.jpg`}
                                        alt="Friends memories"
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                </motion.div>
                            )}
                        </div>

                        <motion.div
                            animate={{opacity: 1, y: 0}}
                            className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 bg-secondary/90 backdrop-blur-sm p-4 rounded-xl shadow-secondary max-w-xs"
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <p className="text-text text-sm">
                                {t('userTestimonial')}
                            </p>
                            <div className="flex items-center mt-3">
                                <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center mr-2">
                                    <span className="text-xs text-text font-bold">AK</span>
                                </div>
                                <span className="text-xs text-primary">{t('userInfo')}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}