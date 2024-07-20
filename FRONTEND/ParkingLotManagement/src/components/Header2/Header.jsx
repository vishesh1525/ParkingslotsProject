import React, { useState, useEffect } from 'react';
import Background from './Components/Background/Background';
import Navbar from './Components/Navbar/Navbar'; // Assuming you have a Navbar component
import Hero from './Components/Hero/Hero'; // Assuming you have a Hero component

const Header2 = () => {
    let heroData = [
        { text1: "parking", text2: "spots" },
        { text1: "reserve", text2: "at ease" },
    ];
    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroCount((count) => (count >= heroData.length ? 0 : count + 1));
        }, 3000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div>
            <Background playStatus={playStatus} heroCount={heroCount} />
            
            <Hero
                setPlayStatus={setPlayStatus}
                heroData={heroData}
                heroCount={heroData[heroCount]} // Fix: pass the correct heroData
                setHeroCount={setHeroCount}
                playStatus={playStatus}
            />
        </div>
    );
};

export default Header2;

