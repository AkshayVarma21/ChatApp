import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/authRoutes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use("/api/auth",authRoutes)

// app.get("/",(req,res)=>{
//     res.send("Hello Akshay")
// })

app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`App running on port ${PORT}`)
})
