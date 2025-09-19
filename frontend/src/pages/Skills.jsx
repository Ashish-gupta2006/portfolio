import {useState, useEffect} from "react";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Skills = () => {
  const[skill, setSkill]= useState([]);
  const[tool, setTool] = useState([]);
  const getSkill = async()=>{
      const res = await axios.get(`${BACKEND_URL}/portfolio/skill`);
      setSkill(res.data.data);
      console.log(res.data.data);
  }

  const getTool = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/tool`);
        setTool(res.data.data);
    } catch (error) {
      console.log(error);
      alert('something went wrong.');
    }
  }

  useEffect(()=>{
    getSkill();
    getTool();
  },[]);
  


  return (
    <>
      {/* Skills Section */}
      <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
        {/* Heading */}
        <div>
          <h1 className="font-bold text-center text-4xl">My Skills</h1>
          <div className="w-20 h-1 bg-blue-600 rounded-lg mx-auto mt-3"></div>
          <p className="text-lg font-medium text-center mt-5 text-gray-700">
            Here are my technical skills that I've been working on and
            improving.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {skill.map((skill) => (
            <div
              key={skill._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4"
            >
              {/* Skill Info */}
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">
                  {skill.skillName}
                </span>
                <span className="font-medium text-gray-600">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies Section */}
      <div className="px-6 max-w-5xl mx-auto mb-10 mt-7">
        {/* Heading */}
        <div>
          <h1 className="font-bold text-4xl text-center">
            Tools & Technologies
          </h1>
          <div className="w-20 h-1 bg-blue-500 rounded-lg mx-auto mt-2"></div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {tool.map((tool) => (
            <div
              key={tool._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={tool.image.url}
                  alt={`${tool._id}image`}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="text-center font-semibold text-lg text-gray-700">
                {tool.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
