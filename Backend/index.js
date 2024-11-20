import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
const app = express();

import userRoutes from "./routes/user.route.js"

dotenv.config();
app.use(cors())

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
    process.exit(1); 
})
// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/user",userRoutes)
