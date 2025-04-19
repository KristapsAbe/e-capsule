import { motion } from 'framer-motion';
import { useLanguage } from "../../../LanguageContext";

const PrivacySection = () => {
    const { t } = useLanguage();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const privacyFeatures = [
        {
            title: t('privateCapsules'),
            description: t('createPersonalCapsules'),
            icon: (
                <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
            ),
            delay: 0.2
        },
        {
            title: t('sharedAccess'),
            description: t('chooseSpecificPeople'),
            icon: (
                <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
            ),
            delay: 0.4
        },
        {
            title: t('timedRelease'),
            description: t('setSpecificDates'),
            icon: (
                <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
            ),
            delay: 0.6
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    {...fadeIn}
                >
                    <h2 className="text-4xl font-bold mb-4">{t('yourPrivacyIs')} <span className="text-button">{t('ourPriority')}</span></h2>
                    <p className="text-primary text-lg max-w-3xl mx-auto">
                        {t('completeControlDigitalFootprint')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {privacyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            animate={{opacity: 1, y: 0}}
                            className="bg-gradient-to-br from-background to-secondary/20 rounded-2xl p-6 border border-secondary/50 shadow-secondary"
                            initial={{opacity: 0, y: 20}}
                            transition={{delay: feature.delay, duration: 0.6}}
                        >
                            <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                <svg
                                    className="h-8 w-8 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {feature.icon}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-primary">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrivacySection;