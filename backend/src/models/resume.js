const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resume:{
        type:String,
        required: true
    },
    fileName:{
        type:String,
        required:true
    }
},
{timestamps:true});

module.exports = mongoose.model("Resumes", resumeSchema);