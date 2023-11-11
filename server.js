import express from "express";
import "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoutes.js"
import cors from "cors";

dotenv.config();
const port=process.env.PORT|| 3001;

const app= express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);




 //connection and port
 const start=async ()=>{
    try {
        await connectDB()
        app.listen(port,console.log(`Server is listening at port ${port}` .bgYellow))
        
    } catch (error) {
        console.log(error);
        
    }
}
start();

 