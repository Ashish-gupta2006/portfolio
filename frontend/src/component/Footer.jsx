
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Ashish Gupta</h2>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4"> Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/certificate" className="hover:text-blue-400">
                Certificate
              </Link>
            </li>
            <li>
              <Link to="/resume" className="hover:text-blue-400 transition">
                Resume
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Me</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Ashish-gupta2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ashish-gupta2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 text-2xl transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/919651724680"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400 text-2xl transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-gray-400 text-center py-4">
        <p>
          &copy;{new Date().getFullYear()} Ashish Gupta. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
