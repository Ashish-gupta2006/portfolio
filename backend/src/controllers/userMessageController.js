const Message = require('../models/message.js');
const messageSchema = require('../validations/messageData.js')
const userMessageController = async(req, res)=>{
    try {
        const{error, value } = messageSchema.validate(req.body,{abortEarly:false});
        // validation failed to send data
        if(error){
            return res.status(400).json({
              success: false,
              message: "Validation failed to enter data.",
              errors: error.details.map((err) => err.message),
            });
        }
        // save in database
        const newMessage = new Message(value);
        await newMessage.save();
        // send response to frontend
        res.status(200).json({
          success: true,
          message: "Message sent successfully.",
        });
    } catch (error) {
        console.log('error is message', error);
        res.status(500).json({
          success: false,
          message: "Something went wrong.",
        });
        
    }
}


module.exports = userMessageController;