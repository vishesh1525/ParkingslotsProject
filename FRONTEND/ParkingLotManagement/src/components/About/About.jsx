import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import somi from "../../assets/somi.jpg";
import shreyas from "../../assets/shreyas.jpg";
import vishesh from "../../assets/vi.jpg";

export default function About() {
    const message = `There are many variations of passages of Lorem Ipsum available but the \n majority have suffered alteration in some injected humour.`;

    return (
        <section className="bg-gray-800 min-h-screen py-20">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 text-white">The Team Behind Book My Spot</h2>
                    <p className="whitespace-pre-line text-gray-300">{message}</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    {[
                        { name: "Shreyas DK", img: shreyas, description: "I am Shreyas DK, an Information Science student at BMS College of Engineering. My passion for technology and innovation drives me to explore the vast realms of data science, machine learning, and software development. I am dedicated to honing my skills and knowledge to contribute meaningfully to the tech industry. Outside of academics, I enjoy working on personal projects, participating in hackathons, and staying updated with the latest technological advancements..", role: "1BM22IS232" },
                        { name: "Somaath Mikali", img: somi, description: "I am Somananth Mikali, currently pursuing Information Science at BMS College of Engineering. With a strong interest in cybersecurity and network engineering, I am focused on developing a deep understanding of these areas to enhance digital security and connectivity. I thrive on challenges and enjoy solving complex problems. Besides my academic pursuits, I am an avid reader and enjoy exploring the latest trends in technology and cybersecurity..", role: "1BM22IS232" },
                        { name: "Vishesh P Gowda", img: vishesh, description: "I am Vishesh P Gowda, an Information Science student at BMS College of Engineering. My academic interests lie in artificial intelligence, data analysis, and software engineering. I am committed to leveraging technology to create innovative solutions that address real-world problems. My enthusiasm for learning and growth extends beyond the classroom, as I actively engage in coding competitions and collaborative projects. In my free time, I enjoy experimenting with new technologies and staying informed about industry developments.", role: "1BM22IS232" }
                    ].map((member, index) => (
                        <div key={index} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-4">
                            <div className="bg-gray-900 text-center p-6 rounded-lg shadow-lg transition duration-250 ease-in-out hover:bg-gray-700 hover:text-white">
                                <img src={member.img} className="w-36 h-36 mx-auto mb-4 rounded-full object-cover border-4 border-gray-700" alt={member.name} />
                                <h3 className="text-lg font-bold uppercase mb-1 text-white transition duration-250 ease-in-out hover:text-gray-300">{member.name}</h3>
                                <div className="block mb-2">
                                    <p className="italic text-gray-400">{member.role}</p>
                                    <div className="inline-block w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                </div>
                                <p className="text-gray-300">{member.description}</p>
                                <ul className="flex justify-center mt-6 space-x-2">
                                    <li><a href="#" className="bg-blue-500 text-white p-2 rounded-full"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#" className="bg-red-600 text-white p-2 rounded-full"><i className="fab fa-pinterest"></i></a></li>
                                    <li><a href="#" className="bg-blue-800 text-white p-2 rounded-full"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="#" className="bg-pink-600 text-white p-2 rounded-full"><i className="fab fa-dribbble"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
