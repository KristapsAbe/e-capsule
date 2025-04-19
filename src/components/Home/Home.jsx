import React, {useState, useEffect} from 'react';
import ReviewHomeSection from "./HomeSections/ReviewHomeSection";
import PrivacySection from "./HomeSections/PrivacySection";
import MemoryCapsuleTypes from "./HomeSections/MemoryCapsuleTypes";
import TimeCapsuleLandingPage from "./HomeSections/TimeCapsuleLandingPage";
import ActionSection from "./HomeSections/ActionSection";
import FeatureSection from "./HomeSections/FeatureSection";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
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
          <TimeCapsuleLandingPage fadeIn={fadeIn}/>

          <FeatureSection/>

          <PrivacySection fadeIn={fadeIn}/>

          <ReviewHomeSection fadeIn={fadeIn}/>

          <MemoryCapsuleTypes fadeIn={fadeIn}/>

          <ActionSection fadeIn={fadeIn}/>
          <footer className="bg-background py-6">
            <div className="container mx-auto px-6">
              <p className="text-center text-primary">&copy; {new Date().getFullYear()} E-Capsule | Save Your Memories</p>
            </div>
          </footer>
        </div>
    );
};

export default Home;