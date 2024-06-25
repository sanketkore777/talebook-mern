import React from "react";
import stories from "./stories.json";
import { HeartIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";

function NewPosts() {
  return (
    // <div className="flex flex-col w-[95%] mt-4">
    //   <div className="mb-4">New stories</div>
    //   <div className="scroll-container flex overflow-x-auto space-x-4">
    //     {stories.map((story) => {
    //       return (
    //         <div className="new-story-card  bg-card-bg">
    //           <div className="">
    //             <div className="card-cover h-[80%]">
    //               <img src={story.coverimg} className="w-full h-full" />
    //             </div>
    //             <div className="card-title">{story.title}</div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className=" w-[90%] mt-4">
      <div className="heading">New posts</div>
      <div className="container mt-4">
        {stories.map((story) => {
          return (
            <div className="card  flex mb-8 bg-card-bg p-2">
              <div className="w-[25%]">
                <img className="" src={story.coverimg}></img>
                <div className="prim-info flex justify-around mt-4">
                  <div className="likes text-center flex items-center">
                    <HeartIcon className="h-5 w-5 text-rose-600 mr-1" />
                    {story.likes}
                  </div>
                  <div className="views text-center flex items-center">
                    <EyeIcon className="h-5 w-5 mr-1" />
                    {story.views}
                  </div>
                </div>
              </div>
              <div className="info w-[70%] m-2 ml-8 pl-2 flex flex-col">
                <div className="title mb-2 font-medium">{story.title}</div>
                <div className="description mb-2">{story.description}</div>
                <div className="tags flex space-x-2 h-12 flex-wrap">
                  {story.tags.map((tag, index) => {
                    return index < 7 ? (
                      <div className="tag bg-black p-1 h-8 rounded-lg cursor-pointer mr-2">
                        {tag}
                      </div>
                    ) : null;
                  })}
                  <div className="m-2">.......</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewPosts;
