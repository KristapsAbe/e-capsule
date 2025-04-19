import { motion } from 'framer-motion';
import { useLanguage } from "../../../LanguageContext";

export default function ActionSection() {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
            <div className="container mx-auto px-6">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-secondary to-accent rounded-3xl p-8 md:p-12 shadow-secondary max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('beginMemoryJourney')}</h2>
                            <p className="text-text opacity-90 mb-6">
                                {t('startDocumenting')}
                            </p>
                            <a href="/CapsuleCreation">
                                <motion.button
                                    className="bg-background text-secondary py-3 px-8 rounded-xl text-lg font-bold hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t('createFirstCapsule')}
                                </motion.button>
                            </a>
                        </div>
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 5, y: -10 }}
                                className="absolute -top-6 -left-6 w-24 h-24 bg-background rounded-2xl flex items-center justify-center shadow-xl z-10"
                                initial={{ rotate: -5, y: 0 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                            >
                                <svg
                                    className="h-12 w-12 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                </svg>
                            </motion.div>
                            <motion.div
                                animate={{ rotate: -5, y: 10 }}
                                className="relative h-64 w-64 mx-auto bg-background rounded-2xl flex items-center justify-center shadow-xl"
                                initial={{ rotate: 5, y: 0 }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                            >
                                <svg
                                    className="h-20 w-20 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                </svg>
                            </motion.div>
                            <motion.div
                                animate={{ rotate: 5, y: 5 }}
                                className="absolute -bottom-6 -right-6 w-20 h-20 bg-background rounded-2xl flex items-center justify-center shadow-xl"
                                initial={{ rotate: -5, y: 0 }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                            >
                                <svg
                                    className="h-10 w-10 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}