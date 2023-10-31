import express from "express";
import {registerController,loginController} from "../controllers/authController.js" 
const router=express.Router();


//Signup Controller||POST
router.post("/register",registerController);


//Login Controller||POST
router.post("/login",loginController);


export default router;