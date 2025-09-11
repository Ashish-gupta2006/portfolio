
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 w-full shadow-neutral-900 ">
      <div className="flex  justify-between h-7 items-center">
        <div>
          <Link to="/" className="text-2xl font-extrabold hover:text-gray-300">
            Ashish Gupta
          </Link>
        </div>
        <div className="hidden space-x-6  md:flex ">
          <ul className="space-x-6 font-semibold">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              {" "}
              About
            </Link>
            <Link to="/education" className="hover:text-gray-300">
              Education
            </Link>
            <Link to="/skills" className='hover:text-gray-300'> Skills</Link>
            <Link to="/project" className='hover:text-gray-300'> Project</Link>
            <Link to="/contact" className='hover:text-gray-300'> Contact</Link>
          </ul>
        </div>
      </div>
      <button
        className="md:hidden block bg-gray-800 text-white absolute right-3 top-4 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      {/* Show mobile manu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4  p-4 rounded-lg">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/education"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Education
          </Link>
          <Link
            to="skills"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Skills
          </Link>
          <Link
            to="project"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Project
          </Link>
          <Link
            to="/contect"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            contect
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar