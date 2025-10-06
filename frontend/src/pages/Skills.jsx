import { useState, useEffect } from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Skills = () => {
  const [skill, setSkill] = useState([]);
  const [tool, setTool] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [skillsRes, toolsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/portfolio/skill`),
          axios.get(`${BACKEND_URL}/portfolio/tool`),
        ]);

        setSkill(skillsRes.data.data);
        setTool(toolsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full absolute bg-white/70 z-10">
        <GridLoader color="#2563EB" size={40} />
      </div>
    );
  }

  return (
    <>
      {/* Skills Section */}
      <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
        <div>
          <h1 className="font-bold text-center text-4xl">My Skills</h1>
          <div className="w-20 h-1 bg-blue-600 rounded-lg mx-auto mt-3"></div>
          <p className="text-lg font-medium text-center mt-5 text-gray-700">
            Here are my technical skills that I've been working on and
            improving.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {skill.map((s) => (
            <div
              key={s._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{s.skillName}</span>
                <span className="font-medium text-gray-600">{s.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies Section */}
      <div className="px-6 max-w-5xl mx-auto mb-10 mt-7">
        <div>
          <h1 className="font-bold text-4xl text-center">
            Tools & Technologies
          </h1>
          <div className="w-20 h-1 bg-blue-500 rounded-lg mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {tool.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={t.image.url}
                  alt={`${t.title} image`}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="text-center font-semibold text-lg text-gray-700">
                {t.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
