import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Lock, Sparkles, Play, Pause, RefreshCw, AlertTriangle } from 'lucide-react';

const AnimatedCapsule = ({ capsuleData }) => {
  // Component state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processedCapsuleData, setProcessedCapsuleData] = useState(null);
  const [stage, setStage] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transition, setTransition] = useState('zoom');
  const [progress, setProgress] = useState(0);

  // Process capsule data from props
  useEffect(() => {
    if (!capsuleData) {
      setError('No capsule data provided');
      return;
    }

    try {
      setLoading(true);

      // Parse images if they're in string format
      let parsedImages;
      if (typeof capsuleData.images === 'string') {
        parsedImages = JSON.parse(capsuleData.images);
      } else {
        parsedImages = capsuleData.images;
      }

      // Transform the capsule data to match what the component expects
      const transformedData = {
        id: capsuleData.id,
        title: capsuleData.title,
        description: capsuleData.description,
        privacy: capsuleData.privacy || 'private',
        images: parsedImages.map((img, index) => ({
          src: img.includes('http') ? img : `http://127.0.0.1:8000/storage/${img}`,
          caption: `Memory ${index + 1}`,
          date: new Date(capsuleData.created_at || Date.now()).toLocaleDateString(),
        })),
        time: {
          is_available: !capsuleData.daysLeft || capsuleData.daysLeft <= 0,
          human_readable: capsuleData.date || new Date().toLocaleDateString(),
          days_until_available: capsuleData.daysLeft || 0,
          formatted: capsuleData.date || new Date().toLocaleDateString(),
        },
        owner: {
          name: capsuleData.userName || 'User',
        },
        created_at: {
          human_readable: new Date(capsuleData.created_at || Date.now()).toLocaleDateString(),
        },
        shared_users: capsuleData.shared_users || [],
        vision: capsuleData.vision || '',
      };

      setProcessedCapsuleData(transformedData);

      // Auto-unlock if the capsule is already available
      if (transformedData.time.is_available) {
        setStage(0);
      }
    } catch (err) {
      console.error('Error processing capsule data:', err);
      setError('Failed to process capsule data');
    } finally {
      setLoading(false);
    }
  }, [capsuleData]);

  // Handle image slideshow
  useEffect(() => {
    let progressTimer;
    if (isPlaying && showContent && processedCapsuleData?.images?.length > 0) {
      setProgress(0);
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((prevIndex) => {
              const next = (prevIndex + 1) % processedCapsuleData.images.length;
              setTransition(['zoom', 'pan', 'fade'][Math.floor(Math.random() * 3)]);
              return next;
            });
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(progressTimer);
  }, [isPlaying, activeIndex, showContent, processedCapsuleData?.images?.length]);

  // Particle effects for animation
  const particles = [...Array(40)].map((_, i) => ({
    color: [
      '#A7ACCD', // primary
      '#5E3762', // secondary
      '#B2779F', // accent
      '#FF95DD', // button
      '#E5E6F0', // text
      '#FFB6C1', // light pink
      '#9370DB', // medium purple
      '#FF69B4', // hot pink
    ][Math.floor(Math.random() * 8)],
    size: Math.random() * 8 + 4,
    spread: Math.random() * 360,
    distance: Math.random() * 200 + 100,
    delay: Math.random() * 0.5,
  }));

  const handleUnlock = () => {
    // Only allow unlocking if the capsule is available or in demo mode
    if (processedCapsuleData?.time?.is_available && stage < 3) {
      setStage((prev) => prev + 1);
      if (stage === 2) {
        setIsUnlocking(true);
        setTimeout(() => {
          setShowContent(true);
        }, 3000);
      }
    } else if (!processedCapsuleData?.time?.is_available) {
      // Show a pulsing effect but don't unlock
      setStage(1);
      setTimeout(() => setStage(0), 500);
    }
  };

  const getImageAnimation = () => {
    switch (transition) {
      case 'zoom':
        return {
          initial: { scale: 1.2, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 },
          transition: { duration: 2.5, ease: 'easeOut' },
        };
      case 'pan':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 },
          transition: { duration: 2.5, ease: 'easeOut' },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 2, ease: 'easeOut' },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 2, ease: 'easeOut' },
        };
    }
  };

  // Loading state
  if (loading) {
    return (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-secondary">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-button border-t-transparent rounded-full animate-spin"></div>
            <p className="text-text text-lg">Loading time capsule...</p>
          </div>
        </div>
    );
  }

  // Error state
  if (error) {
    return (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-secondary">
          <div className="flex flex-col items-center gap-4 max-w-md text-center p-6">
            <AlertTriangle className="w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-bold text-text">Error Loading Capsule</h2>
            <p className="text-text/80">{error}</p>
            <button
                className="mt-4 px-6 py-2 bg-button text-white rounded-full hover:bg-button/80 transition-colors"
                onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
    );
  }

  const validImages = processedCapsuleData?.images || [];
  const currentImage = validImages[activeIndex] || {};
  const isLocked = !processedCapsuleData?.time?.is_available;

  return (
      <div className="w-full max-w-8xl mx-auto p-4">
        {/* Centered Container */}
        <div className="flex justify-center items-center">
          {/* Animated Capsule */}
          <div className="h-[850px] bg-secondary rounded-lg overflow-hidden shadow-lg w-full">
            <div className="w-full h-full min-h-[600px] bg-gradient-to-b from-background to-secondary relative overflow-hidden">
              {!showContent ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Background effects */}
                    <div className="absolute inset-0">
                      {[...Array(30)].map((_, i) => (
                          <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(45deg, ${
                                    ['#A7ACCD', '#5E3762', '#B2779F', '#FF95DD'][Math.floor(Math.random() * 4)]
                                }aa, transparent)`,
                              }}
                              initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: 0.5,
                              }}
                              animate={{
                                y: [-30, 30],
                                x: [-20, 20],
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.2, 0.8, 0.2],
                              }}
                              transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              }}
                          />
                      ))}
                    </div>

                    {/* Explosion particles */}
                    {isUnlocking && (
                        <div className="absolute inset-0 pointer-events-none">
                          {particles.map((particle, i) => (
                              <motion.div
                                  key={i}
                                  className="absolute left-1/2 top-1/2 rounded-full"
                                  style={{
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                  }}
                                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                  animate={{
                                    x: Math.cos((particle.spread * Math.PI) / 180) * particle.distance,
                                    y: Math.sin((particle.spread * Math.PI) / 180) * particle.distance,
                                    scale: [0, 3, 0],
                                    opacity: [1, 0.8, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: particle.delay,
                                    ease: 'easeOut',
                                  }}
                              />
                          ))}
                        </div>
                    )}

                    {/* Main capsule container */}
                    <motion.div
                        className="relative"
                        animate={
                          isUnlocking
                              ? {
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.2, 0.8, 1.4, 0],
                                filter: ['brightness(1)', 'brightness(2)', 'brightness(3)', 'brightness(4)'],
                              }
                              : {
                                rotate: 0,
                                scale: 1,
                              }
                        }
                        transition={
                          isUnlocking
                              ? {
                                duration: 2,
                                times: [0, 0.2, 0.4, 0.6, 1],
                                ease: 'easeInOut',
                              }
                              : {
                                duration: 0.3,
                              }
                        }
                    >
                      {/* Progress indicator */}
                      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-2">
                          {[0, 1, 2].map((i) => (
                              <motion.div
                                  key={i}
                                  className={`w-4 h-4 rounded-full ${i < stage ? 'bg-button' : 'bg-primary/30'}`}
                                  animate={{
                                    scale: i === stage - 1 ? [1, 1.2, 1] : 1,
                                    boxShadow:
                                        i < stage
                                            ? [
                                              '0 0 0 0 rgba(255, 149, 221, 0)',
                                              '0 0 20px 10px rgba(255, 149, 221, 0.5)',
                                              '0 0 0 0 rgba(255, 149, 221, 0)',
                                            ]
                                            : 'none',
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                              />
                          ))}
                        </div>
                      </div>

                      {/* Capsule body */}
                      <motion.div
                          className="w-80 h-[28rem] rounded-3xl relative cursor-pointer overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${isUnlocking ? '#FF95DD' : '#5E3762'}, ${
                                isUnlocking ? '#B2779F' : '#A7ACCD'
                            })`,
                          }}
                          whileHover={{ scale: isLocked ? 1 : 1.02 }}
                          onClick={handleUnlock}
                      >
                        {/* Glowing effects */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: isUnlocking
                                  ? [
                                    'radial-gradient(circle at center, transparent 0%, transparent 100%)',
                                    'radial-gradient(circle at center, rgba(255,149,221,0.5) 0%, transparent 70%)',
                                    'radial-gradient(circle at center, transparent 0%, transparent 100%)',
                                  ]
                                  : 'none',
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Capsule details */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                          <motion.div
                              animate={
                                isUnlocking
                                    ? {
                                      scale: [1, 2, 0],
                                      rotate: [0, 180, 360],
                                      opacity: [1, 0.8, 0],
                                    }
                                    : {
                                      scale: 1,
                                      rotate: 0,
                                      opacity: 1,
                                    }
                              }
                              transition={{ duration: 1.5 }}
                          >
                            {stage < 3 ? (
                                <Lock className="w-16 h-16 text-text" />
                            ) : (
                                <Sparkles className="w-16 h-16 text-button" />
                            )}
                          </motion.div>
                          <motion.div
                              className="text-text font-bold text-xl text-center"
                              animate={
                                isUnlocking
                                    ? {
                                      opacity: [1, 0],
                                      y: [0, -20],
                                    }
                                    : {}
                              }
                              transition={{ duration: 1 }}
                          >
                            {isLocked
                                ? `Available in ${Math.abs(processedCapsuleData?.time?.days_until_available)} days`
                                : stage < 3
                                    ? 'Click to Unlock'
                                    : 'Opening...'}
                          </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded"
                            style={{ background: isUnlocking ? '#FF95DD' : '#A7ACCD' }}
                            animate={
                              isUnlocking
                                  ? {
                                    scaleX: [1, 1.5, 0],
                                    opacity: [1, 0.8, 0],
                                  }
                                  : {}
                            }
                            transition={{ duration: 1.5 }}
                        />
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded"
                            style={{ background: isUnlocking ? '#FF95DD' : '#A7ACCD' }}
                            animate={
                              isUnlocking
                                  ? {
                                    scaleX: [1, 1.5, 0],
                                    opacity: [1, 0.8, 0],
                                  }
                                  : {}
                            }
                            transition={{ duration: 1.5 }}
                        />

                        <Clock className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-6 h-6 text-text" />

                        {/* Title at the bottom */}
                        <div className="absolute bottom-2 left-0 right-0 text-center px-4">
                          <p className="text-text text-sm font-medium truncate">{processedCapsuleData?.title}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
              ) : (
                  <div className="relative w-full h-full">
                    {/* Memory Player */}
                    <div className="absolute inset-0 bg-black">
                      <AnimatePresence mode="wait">
                        {validImages.length > 0 && (
                            <motion.div
                                key={activeIndex}
                                className="relative w-full h-full"
                                {...getImageAnimation()}
                            >
                              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                              <img
                                  src={currentImage.src || '/api/placeholder/800/600'}
                                  alt={currentImage.caption}
                                  className="w-full h-full object-cover scale-110"
                              />

                              {/* Caption */}
                              <motion.div
                                  className="absolute bottom-20 left-0 right-0 p-8 text-center"
                                  initial={{ y: 50, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.5, duration: 1 }}
                              >
                                <h2 className="text-white text-4xl font-bold mb-2">{currentImage.caption}</h2>
                                <p className="text-white/80 text-xl">{currentImage.date}</p>
                              </motion.div>
                            </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Progress indicators */}
                      {validImages.length > 0 && (
                          <div className="absolute top-6 left-4 right-4 flex gap-2 z-10">
                            {validImages.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                                    onClick={() => {
                                      setActiveIndex(index);
                                      setProgress(0);
                                    }}
                                >
                                  <motion.div
                                      className="h-full bg-white"
                                      initial={{ width: '0%' }}
                                      animate={{
                                        width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                                      }}
                                      transition={{ duration: 0.1 }}
                                  />
                                </div>
                            ))}
                          </div>
                      )}

                      {/* Controls */}
                      {validImages.length > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
                            <motion.button
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                              {isPlaying ? (
                                  <Pause className="w-6 h-6 text-white" />
                              ) : (
                                  <Play className="w-6 h-6 text-white" />
                              )}
                            </motion.button>
                            <motion.button
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setActiveIndex((prev) => (prev + 1) % validImages.length);
                                  setProgress(0);
                                }}
                            >
                              <RefreshCw className="w-6 h-6 text-white" />
                            </motion.button>
                          </div>
                      )}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default AnimatedCapsule;