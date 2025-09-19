
const Education = require('../models/education.js');
const Skill = require('../models/skills.js');
const Tool = require('../models/tolls.js')
const Certificate = require('../models/certification.js')
const Project = require('../models/project.js')
const User = require('../models/user.js')
const Resume = require('../models/resume.js');

const getEducation = async(req, res)=>{
  try {
      const education = await Education.find({});
      res.status(200).json({
        success: true,
        data: education,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"error to fetching data" 
    });
  }
}

const getSkill = async(req, res)=>{
try {
    const skill = await Skill.find({});
    res.status(200).json({
      success: true,
      data: skill,
    });
} catch (error) {
    res.status(500).json({
        success:false,
        message:"error to fatching data."
    })
}
}

const getTolls = async(req, res)=>{
    try {
        const tools = await Tool.find({});
        res.status(200).json({
            success:true,
            data:tools,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'error feching data.'
        })
    }
}

const getCertificate = async(req, res)=>{
    try {
        const certificate = await Certificate.find({});
        res.status(200).json({
          success: true,
          data: certificate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'error to fetch data.'
        })
    }
}

const getProject = async(req, res)=>{
    try {
        const project = await Project.find({});
        res.status(200).json({
            success:true,
            data:project,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'failed to fecting data.'
        });
    }
}

const getUserInfo = async(req, res)=>{
try {
    const userInfo = await User.find({});
    res.status(200).json({
        success:true,
        data:userInfo,
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:'failed to fetch data.'
    })
}
}

const getResume = async(req, res)=>{
  try {
      const resume = await Resume.find({});
      res.status(200).json({
        success:true,
        data:resume,
      });
  } catch (error) {
    console.log('error to get resume',error);
    res.status(500).json({
        success:false,
        message:'failed to fetch resume.'
    });
  }
}

module.exports = {
  getEducation,
  getSkill,
  getTolls,
  getCertificate,
  getProject,
  getUserInfo,
  getResume,
};