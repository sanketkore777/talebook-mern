import React from 'react';
import stories from "./stories.json";

function Recent() {
  return (
    <div className="flex flex-col w-[95%] mt-4">
    <div className="mb-4">
      Recent stories
    </div>
    <div className="scroll-container flex overflow-x-auto space-x-4">
      
        {stories.map((story) => {
          return (
            <div className="recent-story-card  bg-card-bg">
            <div className="">
              <div className="card-cover h-[80%]">
                <img src={story.coverimg} className="w-full h-full" />
              </div>
              <div className="card-title">{story.title}</div>
            </div>
      </div>
          );
        })}
    </div>
  </div>
  )
}

export default Recent