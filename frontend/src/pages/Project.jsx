import {useState, useEffect} from "react";
import axios from 'axios'
import{GridLoader} from 'react-spinners'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Project = () => {
  const[projects, setProjects] = useState([]);
  const[loading, setLoading] = useState(true);
  const getProject = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/project`);
      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
      alert(res.data.message ||'SomeThing went wrong.')
    }finally{
      setLoading(!loading);
    }
  }

  useEffect(()=>{
    getProject();
  },[])
  return (
    <div className="max-w-5xl px-6 mx-auto mt-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="w-32 h-1 bg-blue-500 mx-auto mt-3 rounded-lg"></div>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen w-full absolute bg-white/70 z-10">
          <GridLoader color="#2563EB" size={40} />
        </div>
      )}
      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 mb-10">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="flex justify-center items-center">
              <img
                src={project.projectImage.url}
                alt={`${project.projectImage.fileName}_image`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {project.projectName}
              </h2>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
