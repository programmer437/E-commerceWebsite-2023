import express from "express";
import {registerController,loginController,forgotPasswordController} from "../controllers/authController.js" 
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"
const router=express.Router();


//Signup Controller||POST
router.post("/register",registerController);


//Login Controller||POST
router.post("/login",loginController);

//Forgot Password Controller||POST
router.post("/forgot-password",forgotPasswordController);

//User Auth Controller||GET
router.get("/user-auth",requireSignIn,(req,res)=>res.status(200).send({
    ok:true,
}));

//admin Auth Controller||GET
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>res.status(200).send({
    ok:true,
}));



export default router;