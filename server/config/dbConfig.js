const mongoose = require("mongoose");

const mongooseOptions = {
    serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds if no MongoDB connection
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); 
    }
};

module.exports = { connectToMongoDB };
