const Admin = require("../models/user.js");
const Education = require("../models/education.js");
const adminProfileSchema = require("../validations/adminProfile.js");
const educationSchema = require("../validations/educationData.js");
const cloudinary = require("../config/cloudinaryCon.js");
const Skill = require("../models/skills.js");
const Tool = require("../models/tolls.js");
const Project = require('../models/project.js');
const Certificate = require('../models/certification.js');
const skillSchema = require("../validations/skillData.js");
const ToolSchema = require("../validations/toolData.js");
const projectSchema = require('../validations/projectData.js');
const certificateSchema = require('../validations/certificateData.js')
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

const addSkill = async (req, res) => {
  try {
    console.log("skills schema", skillSchema);
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
        success:false,
        message:'data validation failed.',
        errors : error.details.map(err=>(err.message))
      });
    }
    if(!req.file && req.file.filename){
      return res.status(400).json({
        success:false,
        message:'failed uplode image.'
      });
    }
   const newTool = new Tool({
    ...value,
    image:{
      url:req.file.path,
      fileName:req.file.filename
    }
   });
   await newTool.save();
    res.status(200).json({
      success: true,
      message: "data save successfully.",
    });
  } catch (error) {
    console.log(error);
    if(req.file && req.file.filename){
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: "Internal error.",
    });
  }
};

const addProject = async(req, res)=>{
    try {
      const{error, value} = projectSchema.validate(req.body,{abortEarly:false});

      // failed validation
      if(error){
        if(req.file && req.file.filename){
          await cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(400).json({
          success:false,
          message:'validation failed',
          errors:error.details.map((err)=>(err.message)),
        });
      }

      // failed uplode file
      if(!req.file && !req.file.filename){
        return res.status(400).json({
          success:false,
          message:'failed image uplode.'
        });
      }

      const newProject = new Project({
        ...value,
        projectImage:{
          url:req.file.path,
          fileName:req.file.filename,
        }
      });

      await newProject.save();

      res.status(200).json({
        success:true,
        message:'data save successfully.',
      })
    } catch (error) {
      console.log(`error is : ${error}`);
      if(req.file && req.file.filename){
        await cloudinary.uploader.destroy(req.file.filename);
      }
      res.status(500).json({
        success:false,
        message:'Internal server Error.',
      });
    }
}

const addCertificate = async(req, res)=>{
  try {
    const { error, value } = certificateSchema.validate(req.body,{abortEarly:false});
    if(error){
      if(req.file && req.filename){
        await cloudinary.uploader.destroy(req.filename);
      }

      return res.status(400).json({
        success:false,
        message:'form  data valiadtion failed.',
        errors: error.details.map(err=>(err.message)),
      });
    }

    if(!req.file && !req.filename){
       return res.status(400).json({
        success:false,
        message:'failed image uplode.'
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
      success:true,
      message:'Data save successfully.'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:' Server failed, sorry..'
    });
  }
}

const resume = async(req, res)=>{
  try {
    if(!req.file && !req.filename){
       return res.status(400).json({
        success:false,
        message:'failed to uplode image.'
      })
    }

    res.status(200).json({
      success:true,
      message:'successfully uplode image.'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:'server failed, sorry..'
    });
  }
}
module.exports = {
  adminCreateProfile,
  addEducations,
  addSkill,
  addTools,
  addProject,
  addCertificate,
  resume,
};
