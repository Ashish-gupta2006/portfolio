const Admin = require("../models/user.js");
const Education = require("../models/education.js");
const adminProfileSchema = require("../validations/adminProfile.js");
const educationSchema = require("../validations/educationData.js");
const cloudinary = require("../config/cloudinaryCon.js");
const Skill = require("../models/skills.js");
const Tool = require("../models/tolls.js");
const Project = require("../models/project.js");
const Resume = require("../models/resume.js");
const Certificate = require("../models/certification.js");
const skillSchema = require("../validations/skillData.js");
const ToolSchema = require("../validations/toolData.js");
const projectSchema = require("../validations/projectData.js");
const certificateSchema = require("../validations/certificateData.js");
const adminCreateProfile = async (req, res) => {
  try {
    // joi validate form data.
    const { error, value } = adminProfileSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }
    // save to data
    const newAdmin = new Admin({
      ...value,
      image: {
        url: req.file.path,
        fileName: req.file.filename,
      },
    });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "profile created successfully.",
    });
  } catch (error) {
    if (req.file && req.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(404).json({
        success: false,
        message: "admin profile not found.",
      });
    }
    const { error, value } = adminProfileSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(admin.image.fileName);
      await Admin.findByIdAndUpdate(
        id,
        {
          ...value,
          image: {
            url: req.file.path,
            fileName: req.file.filename,
          },
        },
        { new: true }
      );
    } else {
      await Admin.findByIdAndUpdate(id, value);
    }

    res.status(200).json({
      success: true,
      message: "profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    if (req.file && req.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const addEducations = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "data validation failed.",
        errors: error.details.map((err) => err.message),
      });
    }

    const newEducation = new Education(value);
    await newEducation.save();
    res.status(200).json({
      success: true,
      message: "successfully save",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error ",
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const edu = await Education.findById(id);
    if (!edu) {
      return res.status(404).json({
        success: false,
        message: "education data not found.",
      });
    }
    await Education.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully delete education data.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const edu = await Education.findById(id);
    if (!edu) {
      return res.status(404).json({
        success: false,
        message: "education data not found.",
      });
    }
    const { error, value } = educationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "data validation failed.",
        errors: error.details.map((err) => err.message),
      });
    }
    await Education.findByIdAndUpdate(id, value);

    res.status(200).json({
      success: true,
      message: "successfully update education data.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const addSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: " data validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const newSkll = new Skill(value);
    await newSkll.save();
    res.status(200).json({
      success: true,
      message: "data sucessfully save.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error .",
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "skill data not found.",
      });
    }
    await Skill.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully delete skill data.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "skill data not found.",
      });
    }
    const { error, value } = skillSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: " data validation failed",
        errors: error.details.map((err) => err.message),
      });
    }
    await Skill.findByIdAndUpdate(id, value);
    res.status(200).json({
      success: true,
      message: "successfully update skill data.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

// start tools controller
const addTools = async (req, res) => {
  try {
    const { error, value } = ToolSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "data validation failed.",
        errors: error.details.map((err) => err.message),
      });
    }
    if (!req.file && req.file.filename) {
      return res.status(400).json({
        success: false,
        message: "failed uplode image.",
      });
    }
    const newTool = new Tool({
      ...value,
      image: {
        url: req.file.path,
        fileName: req.file.filename,
      },
    });
    await newTool.save();
    res.status(200).json({
      success: true,
      message: "data save successfully.",
    });
  } catch (error) {
    console.log(error);
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const deleteTool = async (req, res) => {
  const { id } = req.params;
  const tool = await Tool.findById(id);
  if (!tool) {
    return res.status(400).json({
      success: false,
      message: " Tool not found!",
    });
  }
  await cloudinary.uploader.destroy(tool.image.fileName);
  await Tool.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: " successfully deleted!",
  });
};

const updateTool = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const tool = await Tool.findById(id);
    if (!tool) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "Toll not found",
      });
    }
    const { error, value } = ToolSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "Validation failed!",
        errors: error.details.map((err) => err.message),
      });
    }
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(tool.image.fileName);
      await Tool.findByIdAndUpdate(id, {
        ...value,
        image: {
          url: req.file.path,
          fileName: req.file.filename,
        },
      });
    } else {
      await Tool.findByIdAndUpdate(id, value);
    }
    res.status(200).json({
      success: true,
      message: "Edit successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "something want wrong",
    });
  }
};
// End tools controller
const addProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body, {
      abortEarly: false,
    });

    // failed validation
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    // failed uplode file
    if (!req.file && !req.file.filename) {
      return res.status(400).json({
        success: false,
        message: "failed image uplode.",
      });
    }

    const newProject = new Project({
      ...value,
      projectImage: {
        url: req.file.path,
        fileName: req.file.filename,
      },
    });

    await newProject.save();

    res.status(200).json({
      success: true,
      message: "data save successfully.",
    });
  } catch (error) {
    console.log(`error is : ${error}`);
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { proId } = req.params;
    const project = await Project.findById(proId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project data not found.",
      });
    }
    await cloudinary.uploader.destroy(project.projectImage.fileName);
    await Project.findByIdAndDelete(proId);
    res.status(200).json({
      success: true,
      message: "successfully delete project data.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const editproject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "project  not found!",
      });
    }

    const { error, value } = projectSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "validation failed!",
        errors: error.details.map((err) => err.message),
      });
    }
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(project.projectImage.fileName);
      await Project.findByIdAndUpdate(id, {
        ...value,
        projectImage: {
          url: req.file.path,
          fileName: req.file.filename,
        },
      });
    } else {
      await Project.findByIdAndUpdate(id, value);
    }
    res.status(200).json({
      success: true,
      message: "update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error",
      error: error,
    });
  }
};

const addCertificate = async (req, res) => {
  try {
    const { error, value } = certificateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(400).json({
        success: false,
        message: "form  data valiadtion failed.",
        errors: error.details.map((err) => err.message),
      });
    }

    if (!req.file && !req.filename) {
      return res.status(400).json({
        success: false,
        message: "failed image uplode.",
      });
    }
    const newCertificate = new Certificate({
      ...value,
      image: {
        url: req.file.path,
        fileName: req.file.filename,
      },
    });
    await newCertificate.save();

    res.status(200).json({
      success: true,
      message: "Data save successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Server failed, sorry..",
    });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(400).json({
        success: false,
        message: "Certificate data not find!",
      });
    }
    await cloudinary.uploader.destroy(certificate.image.fileName);
    await Certificate.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Deleted sucessfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error!",
    });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "Certificate data not find!",
      });
    }

    const { error, value } = certificateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({
        success: false,
        message: "Validation failed!",
        errors: error.details.map((err) => err.message),
      });
    }
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(certificate.image.fileName);
      await Certificate.findByIdAndUpdate(id, {
        ...value,
        image: {
          url: req.file.path,
          fileName: req.file.filename,
        },
      });
    } else {
      await Certificate.findByIdAndUpdate(id, value);
    }

    res.status(200).json({
      success: true,
      message: "Update successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal error.",
      error: error,
    });
  }
};

const resume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    const newResume = new Resume({
      resume: req.file.path, // Cloudinary URL
      fileName: req.file.originalname, // save actual file name
    });

    await newResume.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      url: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  adminCreateProfile,
  updateProfile,
  addEducations,
  deleteEducation,
  updateEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addTools,
  updateTool,
  deleteTool,
  addProject,
  editproject,
  deleteProject,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  resume,
};
