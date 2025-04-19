import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../../../LanguageContext";

const CapsulePrivacyOptions = () => {
    const { t, currentLang } = useLanguage();
    const [selectedOption, setSelectedOption] = useState(null);

    const translations = {
        ENG: {
            capsulePrivacy: "Capsule Privacy",
            chooseWhoCanAccess: "Choose who can access and view your memory capsules",
            private: "Private",
            onlyYouCanAccess: "Only you can access",
            maximumPrivacyProtection: "Maximum privacy protection",
            perfectForPersonalJournals: "Perfect for personal journals",
            select: "Select",
            recommended: "Recommended",
            friendsOnly: "Friends Only",
            shareWithSelectedPeople: "Share with selected people",
            selectiveSharingWithTrustedFriends: "Selective sharing with trusted friends",
            abilityToCommentUnderFriendsCapsules: "Ability to comment under friends capsules",
            collaborativeAdditions: "Collaborative additions",
            public: "Public",
            shareWithTheWorld: "Share with the world",
            publicAccessViaWebURL: "Public access via web URL",
            communityDiscovery: "Community discovery",
            publicComments: "Public comments"
        },
        LAT: {
            capsulePrivacy: "Kapsulas Privātums",
            chooseWhoCanAccess: "Izvēlieties, kurš var piekļūt un apskatīt jūsu atmiņu kapsulas",
            private: "Privāta",
            onlyYouCanAccess: "Tikai jūs varat piekļūt",
            maximumPrivacyProtection: "Maksimāla privātuma aizsardzība",
            perfectForPersonalJournals: "Ideāli personiskajiem žurnāliem",
            select: "Izvēlēties",
            recommended: "Ieteicams",
            friendsOnly: "Tikai Draugiem",
            shareWithSelectedPeople: "Dalīties ar izvēlētiem cilvēkiem",
            selectiveSharingWithTrustedFriends: "Selektīva koplietošana ar uzticamiem draugiem",
            abilityToCommentUnderFriendsCapsules: "Iespēja komentēt draugu kapsulas",
            collaborativeAdditions: "Sadarbības papildinājumi",
            public: "Publiska",
            shareWithTheWorld: "Dalīties ar pasauli",
            publicAccessViaWebURL: "Publiska piekļuve caur tīmekļa URL",
            communityDiscovery: "Kopienas atklāšana",
            publicComments: "Publiski komentāri"
        }
    };

    const getTranslation = (key) => {
        const globalTranslation = t(key);
        if (globalTranslation !== key) {
            return globalTranslation;
        }
        return translations[currentLang]?.[key] || translations["ENG"][key];
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    {...fadeIn}
                >
                    <h2 className="text-4xl font-bold mb-4">
                        {getTranslation("capsulePrivacy")}
                    </h2>
                    <p className="text-primary text-lg max-w-3xl mx-auto">
                        {getTranslation("chooseWhoCanAccess")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        animate={{opacity: 1, y: 0}}
                        className={`bg-background border ${selectedOption === 'private' ? 'border-button' : 'border-secondary/30'} rounded-2xl p-6 shadow-secondary transition-all duration-300`}
                        initial={{opacity: 0, y: 30}}
                        transition={{delay: 0.2, duration: 0.6}}
                        whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.2)'}}
                    >
                        <div className="text-center mb-6">
                            <div className="bg-background rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="h-8 w-8 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{getTranslation("private")}</h3>
                            <p className="text-primary mb-4">{getTranslation("onlyYouCanAccess")}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("maximumPrivacyProtection")}</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("perfectForPersonalJournals")}</span>
                            </li>
                        </ul>
                        <a href={"/CapsuleCreation"} >
                        <motion.button
                            className="w-full py-3 rounded-xl border-2 border-button text-button font-bold hover:bg-button/10 transition-colors duration-300"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={() => handleSelect('private')}
                        >
                            {getTranslation("select")}
                        </motion.button>
                        </a>
                    </motion.div>

                    <motion.div
                        animate={{opacity: 1, y: 0}}
                        className={`bg-gradient-to-br from-background to-secondary/20 border ${selectedOption === 'friends' ? 'border-button' : 'border-secondary'} rounded-2xl p-6 shadow-secondary transition-all duration-300 relative transform scale-105 z-10`}
                        initial={{opacity: 0, y: 30}}
                        transition={{delay: 0.4, duration: 0.6}}
                        whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)'}}
                    >
                        <div
                            className="absolute text-center -top-4 left-1/2 transform -translate-x-1/2 bg-button text-background px-4 py-1 rounded-full text-sm font-bold"
                        >
                            {getTranslation("recommended")}
                        </div>
                        <div className="text-center mb-6">
                            <div
                                className="bg-background rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="h-8 w-8 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{getTranslation("friendsOnly")}</h3>
                            <p className="text-primary mb-4">{getTranslation("shareWithSelectedPeople")}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span
                                    className="text-primary">{getTranslation("selectiveSharingWithTrustedFriends")}</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span
                                    className="text-primary">{getTranslation("abilityToCommentUnderFriendsCapsules")}</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("collaborativeAdditions")}</span>
                            </li>
                        </ul>
                        <a href={"/CapsuleCreation"}>
                            <motion.button
                                className="w-full py-3 rounded-xl bg-button text-background font-bold hover:bg-button/90 transition-colors duration-300"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={() => handleSelect('friends')}
                            >
                                {getTranslation("select")}
                            </motion.button>
                        </a>
                    </motion.div>

                    <motion.div
                        animate={{opacity: 1, y: 0}}
                        className={`bg-background border ${selectedOption === 'public' ? 'border-button' : 'border-secondary/30'} rounded-2xl p-6 shadow-secondary transition-all duration-300`}
                        initial={{opacity: 0, y: 30}}
                        transition={{delay: 0.6, duration: 0.6}}
                        whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.2)'}}
                    >
                        <div className="text-center mb-6">
                            <div
                                className="bg-background rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="h-8 w-8 text-button"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{getTranslation("public")}</h3>
                            <p className="text-primary mb-4">{getTranslation("shareWithTheWorld")}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("publicAccessViaWebURL")}</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("communityDiscovery")}</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-6 w-6 text-button mr-2"
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
                                <span className="text-primary">{getTranslation("publicComments")}</span>
                            </li>
                        </ul>
                        <a href={"/CapsuleCreation"}>
                            <motion.button
                                className="w-full py-3 rounded-xl border-2 border-button text-button font-bold hover:bg-button/10 transition-colors duration-300"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={() => handleSelect('public')}
                            >
                                {getTranslation("select")}
                            </motion.button>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CapsulePrivacyOptions;