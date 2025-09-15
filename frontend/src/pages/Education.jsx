import React from "react";

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Lucknow University",
      year: "2023 - 2026",
      description:
        "Currently pursuing BCA with a focus on full stack web development, data structures, and algorithms.",
    },
    {
      id: 2,
      degree: "Intermediate (12th Grade)",
      institution: "XYZ Intermediate College",
      year: "2021 - 2022",
      description:
        "Completed my intermediate education with PCM (Physics, Chemistry, Math).",
    },
    {
      id: 3,
      degree: "High School (10th Grade)",
      institution: "ABC High School",
      year: "2019 - 2020",
      description:
        "Completed my high school education with a focus on foundational science and mathematics.",
    },
    
  ];

  return (
    <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Education</h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 rounded-lg"></div>
      </div>

      {/* Cards Layout */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {edu.degree}
            </h2>
            <p className="text-gray-600 font-medium">{edu.institution}</p>
            <p className="text-sm text-gray-500 italic">{edu.year}</p>
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
