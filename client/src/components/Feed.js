import React from "react";
import "../css/feed.css";
import Recent from "./Recent";
import NewPosts from "./NewPosts";

function Feed() {
  return (
    <div
      style={{ width: "88%" }}
      className="scroll-container m-5 bg-primary-grey-500 text-gray-200 shadow-lg  w-full lg:w-1/2 min-h-[82vh] max-h-[80vh] overflow-y-auto"
    >
      <div className="recent-stories-container flex justify-center">
        <Recent />
      </div>
      <div className="newpost-container flex justify-center">
        <NewPosts />
      </div>
    </div>
  );
}

export default Feed;
