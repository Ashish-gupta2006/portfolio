import React from "react";

const Project = () => {
  const projects = [
    {
      id: 101,
      name: "RoomEase",
      img: "https://images.unsplash.com/photo-1756995260112-0960d3744f72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      description:
        "RoomEase is a modern web application for booking rooms and villas easily.",
    },
    {
      id: 102,
      name: "ExamPrep",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      description:
        "ExamPrep is an online testing platform designed for conducting MCQ-based exams.",
    },
  ];

  return (
    <div className="max-w-5xl px-6 mx-auto mt-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="w-32 h-1 bg-blue-500 mx-auto mt-3 rounded-lg"></div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 mb-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="flex justify-center items-center">
              <img
                src={project.img}
                alt={`${project.name} project image`}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {project.name}
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
