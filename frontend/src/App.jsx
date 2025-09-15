import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Education from "./pages/Education.jsx";
import Project from "./pages/Project.jsx";
import Skills from "./pages/Skills.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
import DashboardTemplet from "./pages/admin/DashboardTemplet.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProfileData from "./pages/admin/ProfileData.jsx";
import AddCertificate from "./pages/admin/AddCertificate.jsx";
import AddEducation from "./pages/admin/AddEducation.jsx";
import AddProject from "./pages/admin/AddProject.jsx";
import AddSkills from "./pages/admin/AddSkills.jsx";
import AddTools from "./pages/admin/AddTools.jsx";
import ChangePassword from "./pages/admin/ChangePassword.jsx";
import Certification from "./pages/Certification.jsx";
import AddResume from "./pages/admin/Addresume.jsx";

const App = () => {
  return ( 
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certification" element={<Certification/>}/>
        <Route path="/portfolio-admin" element={<DashboardTemplet />} >
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="profile" element={<ProfileData/>}/>
          <Route path="certificate" element={<AddCertificate/>}/>
          <Route path="education" element={<AddEducation/>}/>
          <Route path="project" element={<AddProject/>}/>
          <Route path="skills" element={<AddSkills/>}/>
          <Route path="tools" element={<AddTools/>}/>
          <Route path="resume" element={<AddResume/>}/>
          <Route path="change-password" element={<ChangePassword/>}/>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
