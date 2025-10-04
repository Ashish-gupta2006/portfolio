import React ,{useState, useEffect} from "react";
import axios from 'axios'
import {GridLoader} from 'react-spinners'
const About = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
      </div>

      {/* Content */}
      <div className="mt-8 text-lg text-gray-700 leading-relaxed space-y-2">
        <p>
          Hello! I'm{" "}
          <span className="font-semibold text-blue-600">Ashish Gupta</span>, a
          passionate <span className="font-semibold">Full Stack Developer</span>{" "}
          with a deep love for creating modern, user-friendly, and scalable web
          applications. My focus is on delivering clean, efficient, and
          maintainable code.
        </p>

        <p>
          Over time, I have worked with various technologies like
          <span className="font-medium text-gray-800"> 
             React, Node.js, Express, MongoDB,
          </span>
          and more. I enjoy solving complex problems and turning ideas into
          functional, beautiful digital products.
        </p>

        <p>
          My goal is to continuously improve my skills while contributing to
          projects that make a meaningful impact. When I'm not coding, I love
          exploring new tech trends and learning about innovative solutions in
          web development.
        </p>
            </div>
    </div>
  );
};

export default About;
