import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DashboardTemplet = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
        <div className="bg-slate-500 p-6 space-y-4 text-white">
          <NavLink
            to="dashboard"
            className=" block hover:text-lg hover:text-slate-300 hover:shadow-xl "
          >
            Dashboard
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="certificate"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Certification
          </NavLink>
          <NavLink
            to="education"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Education
          </NavLink>
          <NavLink
            to="project"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Project
          </NavLink>
          <NavLink
            to="skills"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="tools"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Tools
          </NavLink>
          <NavLink
            to="resume"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Resume
          </NavLink>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              `block hover:text-yellow-300 ${
                isActive ? "font-bold text-yellow-400" : ""
              }`
            }
          >
            Change Password
          </NavLink>
        
        </div>

        {/* Main Content Area */}
        <div className="bg-slate-100 p-6 md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplet;
