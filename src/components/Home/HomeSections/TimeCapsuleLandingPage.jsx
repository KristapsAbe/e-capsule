import { motion } from 'framer-motion';
import { useLanguage } from "../../../LanguageContext";

export default function TimeCapsuleLandingPage() {
    const { t } = useLanguage();

    return (
        <section className="min-h-screen container mx-auto px-6 py-12 flex flex-col items-center justify-center">
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    <svg
                        className="h-10 w-10 text-text"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    E-<span className="text-button">CAPSULE</span>
                </h1>
                <p className="text-primary text-xl md:text-2xl max-w-2xl mx-auto">
                    {t('preserveMomentsToday')}
                </p>
                <motion.p
                    animate={{ opacity: 0.8 }}
                    className="text-primary text-lg max-w-3xl mx-auto mt-4 opacity-80"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {t('structuredWayToDocument')}
                </motion.p>
            </motion.div>

            <div className="w-full max-w-5xl">
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative h-64 md:h-80 mb-16 overflow-hidden rounded-3xl shadow-secondary group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-40 z-10 rounded-3xl group-hover:opacity-60 transition-opacity duration-500"
                    >
                    </div>
                    <motion.div
                        animate={{ scale: 1.1 }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80')] bg-cover bg-center"
                        initial={{ scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    >
                    </motion.div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                        <motion.h2
                            animate={{ opacity: 1 }}
                            className="text-3xl md:text-5xl font-bold text-text drop-shadow-lg mb-4 text-center"
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            {t('createDigitalTimeCapsule')}
                        </motion.h2>
                        <motion.p
                            animate={{ opacity: 1 }}
                            className="text-text text-center max-w-2xl text-lg md:text-xl drop-shadow-lg hidden md:block"
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            {t('documentLife')}
                        </motion.p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)' }}
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 4v16m8-8H4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('create')}</h3>
                        <p className="text-primary">{t('buildBeautifulMemoryCapsules')}</p>
                    </motion.div>

                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)' }}
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('seal')}</h3>
                        <p className="text-primary">{t('lockMemories')}</p>
                    </motion.div>

                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)' }}
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                            <svg
                                className="h-6 w-6 text-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('discover')}</h3>
                        <p className="text-primary">{t('rediscoverPastMoments')}</p>
                    </motion.div>
                </div>
            </div>
            <a href="/CapsuleCreation">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                >
                    <motion.button
                        className="bg-button text-background py-4 px-10 rounded-full text-xl font-bold hover:shadow-b2779f-custom transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 149, 221, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('startYourJourney')}
                    </motion.button>
                </motion.div>
            </a>
        </section>
    );
}