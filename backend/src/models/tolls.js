const mongoose = require('mongoose');

const toolSchema = mongoose.Schema({
    image:{
        url:{
            type:String,
            required:true,
        },
        fileName:{
            type:String,
            required:true,
        }
    },
    title:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Tools", toolSchema);
