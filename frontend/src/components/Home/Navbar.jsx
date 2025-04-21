import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
    setIsOpen(false);
  };
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
            <span className="text-xl font-bold text-gray-900">WebiLink</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div
              onClick={() => handleNavigation("/")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 cursor-pointer"
            >
              Home
            </div>
            <div
              onClick={() => handleNavigation("/about")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 cursor-pointer"
            >
              About
            </div>
            <div
              onClick={() => handleNavigation("/events")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 cursor-pointer"
            >
              Events
            </div>
            <div
              onClick={() => handleNavigation("/contact")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 cursor-pointer"
            >
              Contact
            </div>
            <div
              onClick={() => handleNavigation("/dashboard")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 cursor-pointer"
            >
              Dashboard
            </div>
          </div>

          {/* Right Side - Let's Start Button and Profile */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300"
              >
                Let's Start
              </button>
            ) : (
              <div className="relative w-8 h-8">
                {isProfileOpen ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className=" p-2 rounded-full  hover:bg-gray-100 focus:outline-none"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-2 border-blue-900 cursor-pointer"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                )}

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 ${
                    isProfileOpen ? "block" : "hidden"
                  } transition-all duration-300 ease-in-out`}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavigation("/dashboard");
                        setIsProfileOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } pt-2 pb-4 space-y-2 border-t border-gray-200`}
        >
          <div
            onClick={() => handleNavigation("/")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Home
          </div>
          <div
            onClick={() => handleNavigation("/about")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            About
          </div>
          <div
            onClick={() => handleNavigation("/events")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Events
          </div>
          <div
            onClick={() => handleNavigation("/contact")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Contact
          </div>
          {user && (
            <div
              onClick={() => handleNavigation("/dashboard")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-300 cursor-pointer"
            >
              Dashboard
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
