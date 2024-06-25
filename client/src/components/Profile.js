import React from 'react';
import { PhotographIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Profile = () => {
  // Sample user data
  const user = {
    fullName: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    followingCount: 500,
    followersCount: 1000,
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with actual image URL
    stories: [
      { id: 1, text: 'First story' },
      { id: 2, text: 'Second story' },
      // Add more stories as needed
    ],
  };

  return (
    <div className="m-5 bg-primary-grey-500 text-white shadow-lg flex justify-center items-center w-full lg:w-1/2 min-h-[80vh] min-w-[70vw]">
      <div style={{width: "80%"}}>
        {/* Profile Picture and Full Name */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold">{user.fullName}</h2>
            <p className="text-gray-200">@{user.username}</p>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="text-gray-200">
            <span className="text-sm">Email:</span> {user.email}
          </p>
        </div>

        {/* Following and Followers */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="text-center">
            <p className="text-xl font-bold">{user.followingCount}</p>
            <p className="text-gray-200">Following</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{user.followersCount}</p>
            <p className="text-gray-200">Followers</p>
          </div>
        </div>

        {/* Stories */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stories</h3>
          {user.stories.map((story) => (
            <div key={story.id} className="bg-card-bg p-4 rounded-lg mb-4">
              <p>{story.text}</p>
            </div>
          ))}
          {user.stories.length === 0 && (
            <p className="text-gray-200">No stories uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
