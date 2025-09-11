
import { useState } from "react";
const Contact = () => {
  const[formData, setFormData] = useState({
    name:'',
    email:'',
    message:''
  });

  const handleChange=(e)=>{
      const{name, value} = e.target;
      setFormData({
        ...formData,
        [name]:value,
      })
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(formData);
    setFormData({
      name:'',
      email:'',
      message:''
    });
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Contact Me</h1>
        <div className="w-28 h-1 bg-blue-500 mx-auto mt-2 rounded-lg"></div>
        <p className="mt-3 text-gray-600 text-center">
          I'd love to hear from you! Whether you have a question or just want to
          say hello.
        </p>
      </div>

      {/* Contact Info and Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="space-y-4 hidden md:block">
          <p className="text-lg font-medium text-gray-800">
            Email:
            <span className="text-blue-700">ashishgupta.dev@gmail.com</span>
          </p>

          <p className="text-lg font-medium text-gray-800">
            Location: <span className="text-blue-700">Lucknow, India</span>
          </p>

          {/* Social Links */}
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-800">Follow Me</h2>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/Ashish-gupta2006/"
                target="_blank"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-gupta2006/"
                target="_blank"
                className="hover:text-blue-600"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-2 rounded-lg"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-2 rounded-lg"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full border p-2 rounded-lg"
            rows="4"
            name="message"
            onChange={handleChange}
            value={formData.message}
            required
          ></textarea>
          <button
            type="submit"
            className="md:w-40  w-full mx-40 bg-blue-500 text-white py-2 text-center rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
