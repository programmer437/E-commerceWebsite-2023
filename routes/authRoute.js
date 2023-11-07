import express from "express";
import {registerController,loginController} from "../controllers/authController.js" 
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"
const router=express.Router();


//Signup Controller||POST
router.post("/register",registerController);


//Login Controller||POST
router.post("/login",loginController);

router.get("/user-auth",requireSignIn,(req,res)=>res.status(200).send({
    ok:true,
}));


export default router;