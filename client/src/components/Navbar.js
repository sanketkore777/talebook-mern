import React, { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const linkClasses = (link) => {
    return `text-sm px-3 py-2 rounded-md ${
      activeLink === link ? "text-primary-red-500" : "text-white"
    } hover:text-primary-red`;
  };

  return (
    <nav className="bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">TaleBook</div>
            <div className="hidden md:block lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["Home", "About", "Services", "Contact"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className={linkClasses(link)}
                    onClick={() => handleLinkClick(link)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-200" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="text-white block w-full pl-10 pr-3 py-2 border border-zinc-500 rounded-md leading-5 bg-primary-grey-500 placeholder-gray-200 focus:outline-none focus:placeholder-gray-200 focus:ring-1 focus:ring-primary-red-500 focus:border-primary-red-500 sm:text-sm w-1/2 md:w-full lg:w-full sm:w-3/4"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div></div>
          <div>
            <div className="float-right md:hidden lg:hidden w-8 h-8">
              <Bars3Icon className="text-white" onClick={toggleMobileMenu} />
            </div>
          </div>
          <div className="md:hidden lg:hidden">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-200" />
          </div>
          <div className="ml-3 relative">
            <div>
              <button
                onClick={toggleMenu}
                className="max-w-xs bg-card-bg rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red-500"
                id="user-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                />
              </button>
            </div>
            {showMenu && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card-bg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-primary-red-500 hover:text-white"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-primary-red-500 hover:text-white"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-primary-red-500 hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "About", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className={`text-white block px-3 py-2 rounded-md text-base font-medium ${
                  activeLink === link ? "bg-primary-red-500" : ""
                }`}
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
