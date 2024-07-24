import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import somi from "../../assets/somi.jpg"
import shreyas from "../../assets/shreyas.jpg"
import vishesh from "../../assets/vi.jpg"
export default function About() {
    let message = `There are many variations of passages of Lorem Ipsum available but the \n majority have suffered alteration in some injected humour.`;

    return (
        <section className="bg-transparent  bg-stone-400py-20">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4">The Team Behind Book My Spot</h2>
                    <p className="whitespace-pre-line">{message}</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-4">
                        <div className="bg-gray-200 text-center p-12 rounded-lg transition duration-250 ease-in-out hover:bg-blue-600 hover:text-white">
                            <img src={shreyas} className="w-36 h-36 mx-auto mb-4 rounded-full bg-gray-300 p-1" alt="pic" />
                            <h3 className="text-lg font-bold uppercase mb-1 transition duration-250 ease-in-out hover:text-gray-300">SHREYAS DK</h3>
                            <div className="block mb-2">
                                <p className="italic text-gray-500">1BM22IS232</p>
                                <div className="inline-block w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                            </div>
                            <p>I am Shreyas DK, an Information Science student at BMS College of Engineering. My passion for technology and innovation drives me to explore the vast realms of data science, machine learning, and software development. I am dedicated to honing my skills and knowledge to contribute meaningfully to the tech industry. Outside of academics, I enjoy working on personal projects, participating in hackathons, and staying updated with the latest technological advancements..</p>
                            <ul className="flex justify-center mt-6 space-x-2">
                                <li><a href="#" className="bg-blue-500 text-white p-2 rounded-full"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#" className="bg-red-600 text-white p-2 rounded-full"><i className="fab fa-pinterest"></i></a></li>
                                <li><a href="#" className="bg-blue-800 text-white p-2 rounded-full"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#" className="bg-pink-600 text-white p-2 rounded-full"><i className="fab fa-dribbble"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-4">
                        <div className="bg-gray-200 text-center p-12 rounded-lg transition duration-250 ease-in-out hover:bg-blue-600 hover:text-white">
                            <img src={somi} className="w-36 h-36 mx-auto mb-4 rounded-full bg-gray-300 p-1" alt="pic" />
                            <h3 className="text-lg font-bold uppercase mb-1 transition duration-250 ease-in-out hover:text-gray-300">Somaath Mikali</h3>
                            <div className="block mb-2">
                                <p className="italic text-gray-500">1BM22IS232</p>
                                <div className="inline-block w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                            </div>
                            <p>I am Somananth Mikali, currently pursuing Information Science at BMS College of Engineering. With a strong interest in cybersecurity and network engineering, I am focused on developing a deep understanding of these areas to enhance digital security and connectivity. I thrive on challenges and enjoy solving complex problems. Besides my academic pursuits, I am an avid reader and enjoy exploring the latest trends in technology and cybersecurity..</p>
                            <ul className="flex justify-center mt-6 space-x-2">
                                <li><a href="#" className="bg-blue-500 text-white p-2 rounded-full"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#" className="bg-red-600 text-white p-2 rounded-full"><i className="fab fa-pinterest"></i></a></li>
                                <li><a href="#" className="bg-blue-800 text-white p-2 rounded-full"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#" className="bg-pink-600 text-white p-2 rounded-full"><i className="fab fa-dribbble"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-4">
                        <div className="bg-gray-200 text-center p-12 rounded-lg transition duration-250 ease-in-out hover:bg-blue-600 hover:text-white">
                            <img src={vishesh} className="w-36 h-36 mx-auto mb-4 rounded-full bg-gray-300 p-1" alt="pic" />
                            <h3 className="text-lg font-bold uppercase mb-1 transition duration-250 ease-in-out hover:text-gray-300">VISHESH P GOWDA</h3>
                            <div className="block mb-2">
                                <p className="italic text-gray-500">1BM22IS232</p>
                                <div className="inline-block w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                            </div>
                            <p>I am Vishesh P Gowda, an Information Science student at BMS College of Engineering. My academic interests lie in artificial intelligence, data analysis, and software engineering. I am committed to leveraging technology to create innovative solutions that address real-world problems. My enthusiasm for learning and growth extends beyond the classroom, as I actively engage in coding competitions and collaborative projects. In my free time, I enjoy experimenting with new technologies and staying informed about industry developments.






.</p>
                            <ul className="flex justify-center mt-6 space-x-2">
                                <li><a href="#" className="bg-blue-500 text-white p-2 rounded-full"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#" className="bg-red-600 text-white p-2 rounded-full"><i className="fab fa-pinterest"></i></a></li>
                                <li><a href="#" className="bg-blue-800 text-white p-2 rounded-full"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#" className="bg-pink-600 text-white p-2 rounded-full"><i className="fab fa-dribbble"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
