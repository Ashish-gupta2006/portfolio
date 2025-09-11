import React from "react";

const Home = () => {
  return (
    <div className="md:grid grid-cols-2 gap-6 mt-8 px-6 items-center shadow-lg pb-10">
      {/* Left Section - Text */}
      <div className="text-center md:text-left space-y-4 ps-4">
        <h1 className="font-bold text-5xl md:text-5xl ">
          Hi, I'm <span className="text-blue-500">Ashish Gupta</span>
        </h1>
        <p className="text-lg text-gray-600">
          I'm a passionate{" "}
          <span className="font-semibold">Full Stack Developer</span> dedicated
          to building modern, responsive, and user-friendly web applications.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300">
           Downlode Resume
        </button>
      </div>

      {/* Right Section - Profile Image */}
      <div className="flex justify-center mt-6 p-4 md:mt-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww"
          alt="user_image"
          className="w-62 h-62 md:w-72 md:h-62 rounded-full object-cover shadow-lg border-4 border-blue-500"
        />
      </div>
    </div>
  );
};

export default Home;
