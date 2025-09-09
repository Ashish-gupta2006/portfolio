const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(`MongoDB connection failed :${error}`);
        process.exit(1); //stop the server if connection failed
    }
}

module.exports =  connectDB;