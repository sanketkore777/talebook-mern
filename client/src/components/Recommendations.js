import React from "react";

function Recommendations() {
  return (
    <div className="m-5 bg-primary-grey-500 text-white shadow-lg flex justify-center w-full md:w-1/4 lg:w-1/5 min-h-[80vh] hidden lg:inline-flex">
      <div className="container">
        <div className="heading text-center mt-6">
          Suggested for you
        </div>
        <div className="flex flex-wrap user-recommendations justify-center mt-4">
          <div className="card bg-card-bg w-[90%] mb-4 p-2 rounded-md flex flex-row items-center">
            <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                />
                <div className="info ml-4">
                  <div className="name text-sm font-medium">Sanket Kore</div>
                  <div className="username text-sm">sanket_online</div>
                </div>
          </div>
          <div className="card bg-card-bg w-[90%] mb-4 p-2 rounded-md flex flex-row items-center">
            <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                />
                <div className="info ml-4">
                  <div className="name text-sm font-medium">Aryan Belle</div>
                  <div className="username text-sm">aryan_belle</div>
                </div>
          </div>
          <div className="card bg-card-bg w-[90%] mb-4 p-2 rounded-md flex flex-row items-center">
            <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                />
                <div className="info ml-4">
                  <div className="name text-sm font-medium">Shreyash Belle</div>
                  <div className="username text-sm">
                    {
                      "thenameis_shreyash".split('').map((char,index)=>{
                        return index<12?char:null;
                      })
                    } ....
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
