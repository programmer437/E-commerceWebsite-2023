import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Name is required"
            });
        } 
        
        const existingCategory= await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(400).json({
                success:false,
                message:"Category already exists"
            });

        }  

        const category= await categoryModel.create({name,slug:slugify(name)});
        res.status(201).json({
            success:true,
            message:"Category created",
            category
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error,
            message:"Error in creating category"
        });
        
    }

}


//Update category 
export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id}=req.params;
        const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});

        res.status(200).json({
            success:true,
            message:"Category updated successfully",
            category
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error,
            message:"Error in updating category"
        });
        
    }

}

//Get all categories
export const getCategoriesController = async (req, res) => {
    try {
        const categories= await categoryModel.find({});
        res.status(200).json({
            success:true,
            message:"All categories",
            categories
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error,
            message:"Error in getting all category"
        });
        
    }

}

//Get single categories
export const getSingleCategoryController = async (req, res) => {
    try {
        
        const category= await categoryModel.findOne({slug:req.params.slug});
        res.status(200).json({
            success:true,
            message:"Get single category Successfully",
            category
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error,
            message:"Error in getting category"
        });
        
    }

}

//Delete single categories
export const deleteCategoryController= async (req, res) => {
    try {
        
        const category=await categoryModel.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(400).json({
                success:false,
                message:"Category not found"
            });
        }   

        res.status(200).json({
            success:true,
            message:"Deleted single category Successfully",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error,
            message:"Error in deleting category"
        });
        
    }

}

