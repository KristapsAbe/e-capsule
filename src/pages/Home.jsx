import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const fadeIn = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.6}
    };

    return (
        <div className="min-h-screen bg-background text-text font-lexend flex flex-col">
            <section className="min-h-screen container mx-auto px-6 py-12 flex flex-col items-center justify-center">
                <motion.div
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 1, type: "spring"}}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-text" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        E-<span className="text-button">CAPSULE</span>
                    </h1>
                    <p className="text-primary text-xl md:text-2xl max-w-2xl mx-auto">
                        Preserve your moments today, rediscover them tomorrow
                    </p>
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 0.8}}
                        transition={{delay: 0.5, duration: 0.8}}
                        className="text-primary text-lg max-w-3xl mx-auto mt-4 opacity-80"
                    >
                        A structured way to document your journey and maintain a connection with your future self
                    </motion.p>
                </motion.div>

                <div className="w-full max-w-5xl">
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.3, duration: 0.8}}
                        className="relative h-64 md:h-80 mb-16 overflow-hidden rounded-3xl shadow-secondary group cursor-pointer"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-40 z-10 rounded-3xl group-hover:opacity-60 transition-opacity duration-500"></div>
                        <motion.div
                            initial={{scale: 1}}
                            animate={{scale: 1.1}}
                            transition={{duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear"}}
                            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80')] bg-cover bg-center"
                        ></motion.div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                            <motion.h2
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.6, duration: 1}}
                                className="text-3xl md:text-5xl font-bold text-text drop-shadow-lg mb-4 text-center"
                            >
                                Create Your Digital Time Capsule
                            </motion.h2>
                            <motion.p
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.8, duration: 1}}
                                className="text-text text-center max-w-2xl text-lg md:text-xl drop-shadow-lg hidden md:block"
                            >
                                Document your life, maintain connections with the future, and chart your personal growth
                                journey
                            </motion.p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)'}}
                            className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        >
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4v16m8-8H4"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Create</h3>
                            <p className="text-primary">Build beautiful memory capsules with photos, videos, letters,
                                and more.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)'}}
                            className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        >
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Seal</h3>
                            <p className="text-primary">Lock your memories until a future date of your choosing.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.8, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)'}}
                            className="bg-background border border-secondary rounded-2xl p-6 shadow-secondary hover:shadow-b2779f-custom transition-all duration-300"
                        >
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Discover</h3>
                            <p className="text-primary">Rediscover your past moments when the time is right.</p>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.0, duration: 0.8}}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{scale: 1.05, boxShadow: '0 0 25px rgba(255, 149, 221, 0.6)'}}
                        whileTap={{scale: 0.95}}
                        className="bg-button text-background py-4 px-10 rounded-full text-xl font-bold hover:shadow-b2779f-custom transition-all duration-300"
                    >
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </section>

            <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        {...fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4">Your Memories, <span
                            className="text-button">Your Way</span></h2>
                        <p className="text-primary text-lg max-w-3xl mx-auto">
                            Personalize your digital capsules with flexible options tailored to your individual needs
                        </p>
                    </motion.div>

                    <div className="flex justify-center mb-12">
                        <div className="flex p-1 bg-secondary/20 rounded-full">
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={() => setActiveTab('personal')}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'personal' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            >
                                Personal
                            </motion.button>
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={() => setActiveTab('family')}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'family' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            >
                                Family
                            </motion.button>
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={() => setActiveTab('friends')}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === 'friends' ? 'bg-button text-background' : 'text-primary hover:text-button'}`}
                            >
                                Friends
                            </motion.button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{opacity: 0, x: -30}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8}}
                            className="order-2 lg:order-1"
                        >
                            {activeTab === 'personal' && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                >
                                    <h3 className="text-2xl font-bold mb-4">Personal Growth Journey</h3>
                                    <p className="text-primary mb-6">
                                        Document your achievements, reflections, and milestones in a structured way.
                                        Set personal capsules to open on significant dates in your future, creating
                                        a timeline of your development and growth.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Set goals and revisit them years later</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="text-primary">Create private journals and reflections</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Track your journey with customizable milestones</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}

                            {activeTab === 'family' && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                >
                                    <h3 className="text-2xl font-bold mb-4">Family Heritage Preservation</h3>
                                    <p className="text-primary mb-6">
                                        Create shared capsules with family members to preserve your collective heritage.
                                        Document traditions, stories, and special moments to pass down through
                                        generations.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Record family stories and histories</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="text-primary">Collaborate on family milestone documentation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="text-primary">Create time capsules for future generations</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}

                            {activeTab === 'friends' && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                >
                                    <h3 className="text-2xl font-bold mb-4">Friend Group Memories</h3>
                                    <p className="text-primary mb-6">
                                        Build shared capsules with friends to document your adventures together.
                                        Create collaborative collections that strengthen your bond and preserve
                                        your shared experiences.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Document group trips and adventures</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Create capsules for special occasions together</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div
                                                className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center mt-1 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-button"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-primary">Share and collect memories from shared experiences</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 30}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8}}
                            className="order-1 lg:order-2 relative"
                        >
                            <div className="w-full h-80 md:h-96 relative rounded-2xl overflow-hidden shadow-secondary">
                                {activeTab === 'personal' && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.5}}
                                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')] bg-cover bg-center"
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                    </motion.div>
                                )}

                                {activeTab === 'family' && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.5}}
                                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')] bg-cover bg-center"
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                    </motion.div>
                                )}

                                {activeTab === 'friends' && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.5}}
                                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80')] bg-cover bg-center"
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                    </motion.div>
                                )}
                            </div>

                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3, duration: 0.6}}
                                className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 bg-secondary/90 backdrop-blur-sm p-4 rounded-xl shadow-secondary max-w-xs"
                            >
                                <p className="text-text text-sm">
                                    "Memory Capsules allows me to preserve special moments with complete control over
                                    privacy and personalization."
                                </p>
                                <div className="flex items-center mt-3">
                                    <div
                                        className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center mr-2">
                                        <span className="text-xs text-text font-bold">AK</span>
                                    </div>
                                    <span className="text-xs text-primary">Anna K. • Loyal User</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        {...fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4">Your Privacy Is <span className="text-button">Our Priority</span>
                        </h2>
                        <p className="text-primary text-lg max-w-3xl mx-auto">
                            Complete control over your digital footprint with flexible privacy options
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.6}}
                            className="bg-gradient-to-br from-background to-secondary/20 rounded-2xl p-6 border border-secondary/50 shadow-secondary"
                        >
                            <div
                                className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Private Capsules</h3>
                            <p className="text-primary">Create personal capsules that only you can access, ensuring your
                                most intimate memories remain private.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.6}}
                            className="bg-gradient-to-br from-background to-secondary/20 rounded-2xl p-6 border border-secondary/50 shadow-secondary"
                        >
                            <div
                                className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Shared Access</h3>
                            <p className="text-primary">Choose specific people to share your capsules with, creating a
                                more personal and meaningful connection.</p>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.6}}
                            className="bg-gradient-to-br from-background to-secondary/20 rounded-2xl p-6 border border-secondary/50 shadow-secondary"
                        >
                            <div
                                className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <p className="text-primary">Set specific dates for your capsules to be unlocked, creating
                                anticipation and meaningful moments of rediscovery.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        {...fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4">Stories From Our <span
                            className="text-button">Community</span></h2>
                        <p className="text-primary text-lg max-w-3xl mx-auto">
                            Hear how Memory Capsules has transformed the way people connect with their past and future
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.7}}
                            className="bg-background border border-secondary/40 rounded-2xl p-6 shadow-secondary"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3">
                                    <span className="text-text font-bold">JD</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">James Davis</h4>
                                    <p className="text-primary text-sm">Designer • New York</p>
                                </div>
                            </div>
                            <p className="text-primary">
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores autem dignissimos earum eligendi error et exercitationem facilis fugiat inventore laborum molestias nihil officia possimus qui similique, suscipit temporibus vitae."
                            </p>
                            <div className="flex mt-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-button"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.7}}
                            className="bg-background border border-secondary/40 rounded-2xl p-6 shadow-secondary"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3">
                                    <span className="text-text font-bold">RM</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Rachel Martinez</h4>
                                    <p className="text-primary text-sm">Teacher • Toronto</p>
                                </div>
                            </div>
                            <p className="text-primary">
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem id pariatur voluptatum. Beatae consectetur ducimus libero magni maxime natus porro similique tempore! Accusantium delectus dolorem enim maiores mollitia tenetur."
                            </p>
                            <div className="flex mt-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-button"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.7}}
                            className="bg-background border border-secondary/40 rounded-2xl p-6 shadow-secondary"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3">
                                    <span className="text-text font-bold">KL</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Kevin Lee</h4>
                                    <p className="text-primary text-sm">Developer • San Francisco</p>
                                </div>
                            </div>
                            <p className="text-primary">
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dignissimos dolorem doloremque earum fugiat hic impedit magni molestiae odit omnis quis quo, quod saepe totam ullam voluptatibus voluptatum! Dolor, ex?"
                            </p>
                            <div className="flex mt-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-button"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        {...fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4">Simple <span className="text-button">Pricing</span></h2>
                        <p className="text-primary text-lg max-w-3xl mx-auto">
                            Choose the plan that works best for your memory preservation needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.2)'}}
                            className="bg-background border border-secondary/30 rounded-2xl p-6 shadow-secondary transition-all duration-300"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                                <p className="text-primary mb-4">Perfect for individuals</p>
                                <div className="flex justify-center items-end">
                                    <span className="text-4xl font-bold">Free</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">3 Personal Capsules</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Basic customization</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">100MB storage</span>
                                </li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="w-full py-3 rounded-xl border-2 border-button text-button font-bold hover:bg-button/10 transition-colors duration-300"
                            >
                                Get Started
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.3)'}}
                            className="bg-gradient-to-br from-background to-secondary/20 border border-secondary rounded-2xl p-6 shadow-secondary transition-all duration-300 relative transform scale-105 z-10"
                        >
                            <div
                                className="absolute text-center -top-4 left-1/2 transform -translate-x-1/2 bg-button text-background px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                                <p className="text-primary mb-4">Perfect for families</p>
                                <div className="flex justify-center items-end">
                                    <span className="text-4xl font-bold">$5.99</span>
                                    <span className="text-primary ml-1 mb-1">/lifetime</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Unlimited Personal Capsules</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">5 Shared Capsules</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Advanced customization</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">1GB storage</span>
                                </li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="w-full py-3 rounded-xl bg-button text-background font-bold hover:bg-button/90 transition-colors duration-300"
                            >
                                Start Free Trial
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.6}}
                            whileHover={{y: -10, boxShadow: '0 15px 30px rgba(178, 119, 159, 0.2)'}}
                            className="bg-background border border-secondary/30 rounded-2xl p-6 shadow-secondary transition-all duration-300"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">Business</h3>
                                <p className="text-primary mb-4">For organizations</p>
                                <div className="flex justify-center items-end">
                                    <span className="text-4xl font-bold">$14.99</span>
                                    <span className="text-primary ml-1 mb-1">/lifetime</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Unlimited Everything</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Team collaboration tools</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">Analytics dashboard</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-button mr-2"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-primary">10GB storage</span>
                                </li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="w-full py-3 rounded-xl border-2 border-button text-button font-bold hover:bg-button/10 transition-colors duration-300"
                            >
                                Contact Sales
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="bg-gradient-to-r from-secondary to-accent rounded-3xl p-8 md:p-12 shadow-secondary max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Begin Your Memory
                                    Preservation Journey</h2>
                                <p className="text-text opacity-90 mb-6">
                                    Start documenting your life story today and create connections with your future
                                    self.
                                </p>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    className="bg-background text-secondary py-3 px-8 rounded-xl text-lg font-bold hover:shadow-lg transition-all duration-300"
                                >
                                    Create Your First Capsule
                                </motion.button>
                            </div>
                            <div className="relative">
                                <motion.div
                                    initial={{rotate: -5, y: 0}}
                                    animate={{rotate: 5, y: -10}}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -top-6 -left-6 w-24 h-24 bg-background rounded-2xl flex items-center justify-center shadow-xl z-10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-button"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </motion.div>
                                <motion.div
                                    initial={{rotate: 5, y: 0}}
                                    animate={{rotate: -5, y: 10}}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    className="relative h-64 w-64 mx-auto bg-background rounded-2xl flex items-center justify-center shadow-xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-button"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"/>
                                    </svg>
                                </motion.div>
                                <motion.div
                                    initial={{rotate: -5, y: 0}}
                                    animate={{rotate: 5, y: 5}}
                                    transition={{
                                        duration: 4.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -bottom-6 -right-6 w-20 h-20 bg-background rounded-2xl flex items-center justify-center shadow-xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-button"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            <footer className="bg-background py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">E-<span className="text-button">Capsule</span>
                            </h3>
                            <p className="text-primary mb-4">Preserve your moments today, rediscover them tomorrow.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-primary hover:text-button transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-primary hover:text-button transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-primary hover:text-button transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Home</a>
                                </li>
                                <li><a href="#"
                                       className="text-primary hover:text-button transition-colors">Features</a></li>
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Pricing</a>
                                </li>
                                <li><a href="#" className="text-primary hover:text-button transition-colors">FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Help
                                    Center</a></li>
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Contact
                                    Us</a></li>
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Privacy
                                    Policy</a></li>
                                <li><a href="#" className="text-primary hover:text-button transition-colors">Terms of
                                    Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                            <p className="text-primary mb-4">Stay updated with our latest features and releases.</p>
                            <div className="flex">
                                <input type="email" placeholder="Your email"
                                       className="px-4 py-2 rounded-l-lg focus:outline-none w-full"/>
                                <button
                                    className="bg-button text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors">
                                Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8">
                        <p className="text-center text-primary">&copy; {new Date().getFullYear()} E-Capsule. All rights reserved.</p>
                    </div>
                </div>
            </footer>
</div>
);
};

export default Home;