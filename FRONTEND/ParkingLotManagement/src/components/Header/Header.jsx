import React, { useState, useEffect } from 'react';
import Background from '../Header2/Components/Background/Background';
import Navbar from '../Header2/Components/Navbar/Navbar'; // Assuming you have a Navbar component
import Hero from '../Header2/Components/Hero/Hero'; // Assuming you have a Hero component
import dimg1 from "../../assets/dashboard.jpg";

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
        <section>
            <div>
                {/* <Background playStatus={playStatus} heroCount={heroCount} /> */}

                {/* <Hero
                setPlayStatus={setPlayStatus}
                heroData={heroData}
                heroCount={heroData[heroCount]} // Fix: pass the correct heroData
                setHeroCount={setHeroCount}
                playStatus={playStatus}
            /> */}
            </div>
            <div id="mainDiv">
                <div
                    className="hero min-h-screen text-white"
                    style={{
                        backgroundImage: `url(${dimg1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <Background playStatus={playStatus} heroCount={heroCount} />
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header2;
