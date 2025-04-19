import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';
import Icon from '../VisualAspects/Icon';
import { useLanguage } from "../../../LanguageContext";

const CapsuleTimeline = () => {
    const { t } = useLanguage();
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeDistributionData, setTimeDistributionData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetchCapsules();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchCapsules = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const currentUserId = parseInt(localStorage.getItem('user_id'));

            const response = await fetch('http://127.0.0.1:8000/api/capsules', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(t('failedToFetchCapsules'));
            }

            const result = await response.json();

            if (result.status === 'success') {
                const transformedCapsules = result.data.map(capsule => {
                    const createdAt = new Date(capsule.created_at);
                    const date = `${createdAt.toLocaleString('default', { month: 'short' })} ${createdAt.getDate()}`;

                    return {
                        id: capsule.id,
                        date: date,
                        type: capsule.title || t('untitledCapsule'),
                        preview: getIconForCapsule(capsule.title || ''),
                        private: capsule.privacy !== 'public',
                        highlight: capsule.is_owner,
                        description: capsule.description || t('noDescription')
                    };
                });

                setCapsules(transformedCapsules);

                generateDistributionData(result.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getIconForCapsule = (title) => {
        if (!title) return 'memory';

        const titleLower = title.toLowerCase();
        if (titleLower.includes('travel')) return 'plane';
        if (titleLower.includes('birthday')) return 'cake';
        if (titleLower.includes('family')) return 'group';
        if (titleLower.includes('work')) return 'briefcase';
        if (titleLower.includes('food')) return 'food';
        return 'memory';
    };

    const generateDistributionData = (rawCapsules) => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const distribution = months.map(month => ({ name: month, capsules: 0 }));

        rawCapsules.forEach(capsule => {
            try {
                const createdAt = new Date(capsule.created_at);
                if (!isNaN(createdAt.getTime())) {
                    const monthIndex = createdAt.getMonth();
                    distribution[monthIndex].capsules += 1;
                }
            } catch (err) {
            }
        });

        setTimeDistributionData(distribution);
    };

    if (loading) {
        return (
            <div className="w-full h-full bg-accent/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 flex items-center justify-center">
                <div className="text-text">{t('loadingCapsules')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full bg-accent/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 flex items-center justify-center">
                <div className="text-red-500">{t('error')}: {error}</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-accent/10 backdrop-blur-lg rounded-2xl p-3 md:p-6 flex flex-col border border-accent/30 shadow-secondary relative timeline-scrollbar overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center">
                    <div className="w-1 md:w-2 h-6 md:h-8 bg-button rounded-full mr-2"></div>
                    <h2 className="text-text text-lg md:text-xl font-bold italic">{t('memoryCapsuleTimeline')}</h2>
                </div>
                <div className="bg-background/40 backdrop-blur-sm text-text px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm border border-accent/30 flex items-center space-x-1 md:space-x-2 hover:bg-background/60 transition-all duration-300 cursor-pointer">
                    <span>{t('all')}</span>
                    <Icon name="filter" />
                </div>
            </div>

            <div className="flex-grow timeline-scrollbar overflow-y-auto overflow-x-hidden pr-1">
                {capsules.length > 0 ? (
                    <div className="space-y-4 md:space-y-5">
                        {capsules.map((item, index) => (
                            <div key={item.id || index} className="flex">
                                <div className="relative">
                                    <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${item.highlight ? 'bg-gradient-to-br from-button to-secondary' : 'bg-secondary'} flex items-center justify-center shadow-lg`}>
                                        <Icon name={item.preview} />
                                    </div>
                                    {index < capsules.length - 1 && (
                                        <div className="absolute top-8 md:top-10 left-1/2 w-0.5 h-10 md:h-12 bg-accent/30"></div>
                                    )}
                                </div>
                                <div className="ml-2 md:ml-4 flex-grow max-w-[calc(100%-40px)] md:max-w-[calc(100%-50px)]">
                                    <div className={`${item.highlight ? 'bg-gradient-to-r from-background to-background/80' : 'bg-background/80'} p-2 md:p-3 rounded-xl shadow-secondary backdrop-blur-sm border ${item.highlight ? 'border-button/30' : 'border-accent/20'} hover:border-button/50 transition-all duration-300 cursor-pointer`}>
                                        <div className="flex justify-between items-center">
                                            <span className={`${item.highlight ? 'text-button' : 'text-primary'} text-xs md:text-sm font-bold`}>{item.date}</span>
                                            <span className="text-text/70 text-xs bg-secondary/30 px-1 md:px-2 py-0.5 rounded-full">
                                                {item.highlight ? t('owner') : t('shared')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1 md:mt-2">
                                            <div className="max-w-[85%]">
                                                <h3 className="text-text text-sm md:text-base font-bold flex items-center truncate">
                                                    {item.type}
                                                    {item.highlight && <Icon className="ml-1 text-button" name="sparkle" />}
                                                </h3>
                                                <p className="text-primary/70 text-xs mt-0.5 md:mt-1 line-clamp-2">{item.description}</p>
                                            </div>
                                            <div className="flex ml-2">
                                                <div className={`${item.private ? 'bg-secondary' : 'bg-accent/60'} h-5 md:h-6 w-5 md:w-6 rounded-full flex items-center justify-center text-text/90 shadow-sm`}>
                                                    <Icon name={item.private ? 'lock' : 'group'} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <div className="relative">
                                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full border-2 border-dashed border-accent flex items-center justify-center">
                                    <Icon name="plus" />
                                </div>
                            </div>
                            <div className="ml-2 md:ml-4 flex-grow">
                                <div className="bg-background/40 p-2 md:p-3 rounded-xl border border-dashed border-accent/40 backdrop-blur-sm hover:border-button/40 transition-all duration-300 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <span className="text-accent/70 text-xs md:text-sm font-bold">{t('addNew')}</span>
                                        <span className="text-text/50 text-xs hidden md:inline">{t('planAhead')}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1 md:mt-2">
                                        <div>
                                            <h3 className="text-text/70 text-xs md:text-sm font-bold flex items-center">
                                                {t('createMemoryPoint')}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <a href={"/CapsuleCreation"}>
                                <button
                                    className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-button text-background flex items-center justify-center shadow-secondary hover:bg-button/80 transition-all duration-300">
                                    <Icon name="plus"/>
                                </button>
                            </a>
                        </div>
                    </div>
                    ) : (
                    <div className="text-center text-text/70 py-6 md:py-8">
                        {t('noCapsules')}
                    </div>
                )}
            </div>

            <div className="w-full bg-background/70 backdrop-blur-sm border border-accent/20 p-3 md:p-4 rounded-xl mt-4 shadow-secondary relative z-10 hover:border-button/30 transition-all duration-300">
                <div className="flex justify-between items-center">
                    <h3 className="text-text font-bold text-xs flex items-center">
                        <Icon className="mr-1" name="fire" /> {t('capsuleDistribution')}
                    </h3>
                    <span className="text-text/70 text-xs bg-secondary/30 px-2 py-0.5 rounded-full">{new Date().getFullYear()}</span>
                </div>
                <div className="h-20 md:h-24 mt-2">
                    <ResponsiveContainer height="100%" width="100%">
                        <LineChart data={timeDistributionData}>
                            <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#B2779F' }} />
                            <YAxis tick={{ fontSize: 8, fill: '#B2779F' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#191A28',
                                    border: '1px solid #B2779F',
                                    borderRadius: '8px',
                                    color: '#E5E6F0',
                                    padding: '6px'
                                }}
                            />
                            <Line
                                activeDot={{ fill: '#FF95DD', stroke: '#5E3762', strokeWidth: 2, r: 6 }}
                                dataKey="capsules"
                                dot={{ fill: '#5E3762', stroke: '#FF95DD', strokeWidth: 2, r: 4 }}
                                stroke="#FF95DD"
                                strokeWidth={2}
                                type="monotone"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CapsuleTimeline;