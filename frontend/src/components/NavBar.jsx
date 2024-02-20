import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useEffect } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to search page with the search query
    navigate(`/search/${searchQuery}`);
    closeMobileMenu(); // Close mobile menu after search
  };

  const handleUploadModel = () => {
    // Navigate to the upload model page
    navigate("/UploadModel");
    closeMobileMenu(); // Close mobile menu after upload model
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gray-600">
      <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 h-16 text-white relative">
        <span className="text-xl font-bold cursor-pointer m-4">MODELS</span>

        <div className="hidden md:flex justify-center items-center space-x-4 flex-grow">
          <ul className="flex justify-between items-center space-x-4">
            <li
              onClick={() => {
                navigate("/");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/explore");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Explore
            </li>
            <li
              onClick={() => {
                navigate("/topModel");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Top Models
            </li>
          </ul>

          <form onSubmit={handleSearch} className="mr-6 flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:bg-gray-800"
            />
            <button
              type="submit"
              className="ml-1 mr-2 bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Search
            </button>
          </form>

          <li onClick={handleUploadModel} className="px-2 cursor-pointer">
            <button className="bg-transparent border border-gray-800 px-3 py-1 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none">
              Upload Model
            </button>
          </li>
        </div>

        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Use Tailwind CSS to toggle visibility of mobile menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-zinc-600 flex flex-col items-center z-50`}
        >
          <ul className="my-4 space-y-4">
            <li
              onClick={() => {
                navigate("/");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/explore");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Explore
            </li>
            <li
              onClick={() => {
                navigate("/topModel");
                closeMobileMenu();
              }}
              className="cursor-pointer"
            >
              Top Models
            </li>
          </ul>
          <form onSubmit={handleSearch} className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:bg-gray-800"
            />
            <button
              type="submit"
              className="ml-1 bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Search
            </button>
          </form>
          <button
            onClick={handleUploadModel}
            className="bg-transparent border border-gray-800 px-3 py-1 rounded-md text-white hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            Upload Model
          </button>
        </div>
      </nav>
    </header>
  );
}
