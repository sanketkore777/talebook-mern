import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { name: 'Feed', value: 'feed', link: '/feed' },
    { name: 'Favorites', value: 'favorites',link: '/favorites' },
    { name: 'Profile', value: 'profile', link: '/profile' },
    { name: 'Settings', value: 'settings', link: '/settings' },
  ];

  return (
    <div className="lg:hidden h-16 flex flex-col items-center justify-center">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <Link
          to={tab.link}
            key={tab.value}
            className={`px-4 py-2 text-white ${activeTab === tab.value ? 'bg-[#F31260]' : 'bg-card-bg'}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Tabs;
