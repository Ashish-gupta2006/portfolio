import React from "react";

const Skills = () => {
  // Skills for progress bar
  const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Express.js", level: 70 },
    { name: "MongoDB", level: 70 },
    { name: "Tailwind CSS", level: 85 },
  ];

  // Tools & Technologies Array
  const tools = [
    {
      name: "React.js",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      name: "Node.js",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    },
    {
      name: "MongoDB",
      image: "https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg",
    },
    {
      name: "Express.js",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    },
    {
      name: "Tailwind CSS",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    },
    {
      name: "Git & GitHub",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
    },
  ];

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
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4"
            >
              {/* Skill Info */}
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{skill.name}</span>
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
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={tool.image}
                  alt={`${tool.name} logo`}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="text-center font-semibold text-lg text-gray-700">
                {tool.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
