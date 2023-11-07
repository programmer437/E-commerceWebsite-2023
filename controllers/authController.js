import userModel from "../models/userModel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//Signup Controller||POST

export const registerController= async (req,res)=>{
    try {

        //Get data from the front-end
        const {name,email,password,phone,address,answer}=req.body;

        //Check if the fields are empty
        if(!name){
            return res.status(400).send({message:"Name is required"});
        }
        if(!password){
            return res.status(400).send({message:"password is required"});
        }
        if(!phone){
            return res.status(400).send({message:"phone is required"});
        }
        if(!email){
            return res.status(400).send({message:"email is required"});
        }
        if(!address){
            return res.status(400).send({message:"address is required"});
        }
        if(!answer){
            return res.status(400).send({message:"answer is required"});
        }

        //Check if user exists
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User Already Exists"
            })
        }

        const hashedPassword= await hashPassword(password);
        const user= await userModel.create({name,email,password:hashedPassword,phone,address,answer});
        res.status(201).send({
            success:true,
            message:"User Created",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in  Registration",
            error
        })
        
    }

};

//Login Controller||POST
export const loginController= async (req,res)=>{
    try {
        const {email,password}=req.body;
        //Check if the fields are empty
        if(!password || !email){
            return res.status(400).send({
                success:false,
                message:"Invaild email or password"
            });
        }
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            });
        }
        //Check if the password is correct
        const match= await comparePassword(password,user.password);
        if(!match){
            return res.status(400).send({
                success:false,
                message:"Invaild email or password"
            });
        }

        //Token 
        const token= JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token
        });
    
        
        
 
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in  Login",
            error
        })
        
        
    }

}
export const forgotPasswordController= async (req,res)=>{
    try {

        //Get data from the front-end
        const {email,answer,newPassword}=req.body;

        //Check if the fields are empty
        if(!email){
            return res.status(400).send({message:"email is required"});
        }
        if(!answer){
            return res.status(400).send({message:"address is required"});
        }
        if(!newPassword){
            return res.status(400).send({message:"Password is required"});
        }
        const user= await userModel.findOne({email,answer}) 
        //Check if user doesnt exists
        if(!user){
            return res.status(400).send({
                success:false,
                message:"Wrong Email or Answer"
            });
        }
        //Update the Password
        const hashed= await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Updated"
        })

        
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went Worng",
            error
        })
        
    }

};


