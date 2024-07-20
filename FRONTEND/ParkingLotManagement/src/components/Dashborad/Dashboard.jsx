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
                    <Background playStatus={playStatus} heroCount={heroCount} />
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Welcome to Book My Spot!</h1>
                            <p className="mb-5">
                            Our goal is to provide safe, convenient, and accessible parking 
                            for all students, faculty, staff, and visitors. We are committed to ensuring a smooth and hassle-free 
                            parking experience, making your time on campus as stress-free as possible. 
                            Whether you're here for a single class, a full day of work, or a brief visit, 
                            we have the resources and support you need to park with confidence.
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
