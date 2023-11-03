import express from "express";
import "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js"
import cors from "cors";

dotenv.config();
const PORT=process.env.PORT|| 8080;

const app= express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

//routes
app.use("/api/v1/auth",authRoute);




 //connection and port
 const start=async ()=>{
    try {
        await connectDB()
        app.listen(process.env.PORT,console.log(`Server is listening at port ${process.env.PORT}`))
        
    } catch (error) {
        console.log(error);
        
    }
}
start();

 