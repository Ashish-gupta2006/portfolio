const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:email,
        required:true,
    }, 
    message:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
}
);

module.exports = mongoose.model("Message",messageSchema);