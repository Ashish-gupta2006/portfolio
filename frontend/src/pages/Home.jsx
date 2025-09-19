import {useState, useEffect} from "react";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Home = () => {
  const[userData, setUserData] = useState([]);
  const[resume, setResume] = useState([]);
  const getUserData = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/user`);
      setUserData(res.data.data[0]);
    } catch (error) {
      console.log(error);
      alert(error.res.data.message || "Something went wrong.");
    }

  }

  const getResume = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/resume`);
      setResume(res.data?.data[0]?.resume);
      // console.log(res.data?.data[0]?.resume);
    } catch (error) {
      console.log('failed to fetch resume',error);
      alert(error.res?.data?.message)
    }

  }

  useEffect(()=>{
    getResume();
    getUserData();
  },[])
  return (
    <div className="md:grid grid-cols-2 gap-6 mt-8 px-6 items-center shadow-lg pb-10">
      {/* Left Section - Text */}
      <div className="text-center md:text-left space-y-4 ps-4">
        <h1 className="font-bold text-5xl md:text-5xl ">
          Hi, I'm{" "}
          <span className="text-blue-500">{`${userData?.adminName}`}</span>
        </h1>
        <p className="text-lg text-gray-600">
          I'm a passionate{" "}
          <span className="font-semibold">Full Stack Developer</span> dedicated
          to building modern, responsive, and user-friendly web applications.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 mt-2">
          <a
            href={resume}
            download="Ashish_Gupta_Resume.pdf"
            target="_blank"
          >
             Resume
          </a>
        </button>
      </div>

      {/* Right Section - Profile Image */}
      <div className="flex justify-center mt-6 p-4 md:mt-0">
        <img
          src={userData?.image?.url}
          alt="user_image"
          className="w-62 h-62 md:w-72 md:h-62 rounded-full object-cover shadow-lg border-4 border-blue-500"
        />
      </div>
    </div>
  );
};

export default Home;
