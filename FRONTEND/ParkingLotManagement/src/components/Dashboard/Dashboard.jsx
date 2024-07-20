import React from 'react'
import dimg1 from "../../assets/dashboard.jpg"
const Dashboard = () => {
    return (
        <section>
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
                    {/* <Background playStatus={playStatus} heroCount={heroCount} /> */}
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
    )
}

export default Dashboard
