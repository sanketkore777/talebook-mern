import React, { useState } from 'react';
import { HomeIcon, StarIcon, FireIcon, UserIcon, CogIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const linkClasses = (path) => (
    `flex items-center p-2 transition duration-300 ${activeLink === path ? 'bg-primary-red-500 text-white' : 'text-gray-800'}`
  );

  return (
    <div className="bg-primary-grey-500 shadow-lg p-4 w-full md:w-1/4 lg:w-1/5 min-h-[80vh] m-5 flex flex-col hidden lg:flex">
      <nav className="flex-grow">
        <ul className="space-y-4 sidebarul">
          <li>
            <Link to="/feed" className={linkClasses('/feed')} onClick={() => handleClick('/feed')} style={{color: "white"}}>
              <UsersIcon className="h-6 w-6 mr-3" />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link to="/favorites" className={linkClasses('/favorites')} onClick={() => handleClick('/favorites')} style={{color: "white"}}>
              <StarIcon className="h-6 w-6 mr-3" />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link to="/popular" className={linkClasses('/popular')} onClick={() => handleClick('/popular')} style={{color: "white"}}>
              <FireIcon className="h-6 w-6 mr-3" />
              <span>Popular</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={linkClasses('/profile')} onClick={() => handleClick('/profile')} style={{color: "white"}}>
              <UserIcon className="h-6 w-6 mr-3" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pt-4 border-t">
        <Link to="/settings" className={linkClasses('/settings')} onClick={() => handleClick('/settings')} style={{color: "white"}}>
          <CogIcon className="h-6 w-6 mr-3" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
