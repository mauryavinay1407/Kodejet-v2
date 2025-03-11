import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsMenuOpen(false); // Close the menu after clicking a link
    };

    return (
        <header className="bg-blue-700 py-4 sm:py-6 shadow-md">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center text-xl sm:text-2xl font-bold text-white">
                        <img
                            src="logo.svg"
                            alt="KodeJet Logo"
                            className="h-8 sm:h-10 mr-3"
                        />
                        KodeJet
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="md:hidden p-2 text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>

                    {/* Navigation Links */}
                    <nav
                        className={`${
                            isMenuOpen ? "block" : "hidden"
                        } md:flex md:items-center md:space-x-6 absolute md:static bg-blue-700 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0 z-10`}
                    >
                        <button
                            onClick={() => handleScroll("features")}
                            className="block w-full md:w-auto text-white font-medium hover:text-blue-100 transition-colors py-2 md:py-0 text-left md:text-center"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => handleScroll("demo")}
                            className="block w-full md:w-auto text-white font-medium hover:text-blue-100 transition-colors py-2 md:py-0 text-left md:text-center"
                        >
                            Demo
                        </button>
                        <button
                            onClick={() => handleScroll("languages")}
                            className="block w-full md:w-auto text-white font-medium hover:text-blue-100 transition-colors py-2 md:py-0 text-left md:text-center"
                        >
                            Languages
                        </button>
                    </nav>

                    {/* Get Started Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => navigate("/playground")}
                            className="inline-block px-5 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;