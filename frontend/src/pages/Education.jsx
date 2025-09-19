import { useState,useEffect } from "react";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Education = () => {
  const [education, setEducation] = useState([]);
  const getEducation = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/education`);
      setEducation(res.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getEducation();

  },[]);
  return (
    <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Education</h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 rounded-lg"></div>
      </div>

      {/* Cards Layout */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((edu) => (
          <div
            key={edu._id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {edu.degree}
            </h2>
            <p className="text-gray-600 font-medium">{edu.college}</p>
            <p className="text-sm text-gray-500 italic">
              {edu.start}&nbsp;-&nbsp;{edu.end}
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
