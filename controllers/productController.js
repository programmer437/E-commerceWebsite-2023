import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from "fs";

export const createProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;

        if (!name) {
            return res.status(400).send({ 
                ok: false,
                message: "Name is required"
            });
        } else if (!description) {
            return res.status(400).send({
                ok: false,
                message: "Description is required"
            });
        } else if (!price) {
            return res.status(400).send({
                ok: false,
                message: "Price is required"
            });
        } else if (!category) {
            return res.status(400).send({
                ok: false,
                message: "Category is required"
            });
        } else if (!quantity) {
            return res.status(400).send({
                ok: false,
                message: "Quantity is required"
            });
        } else if (photo && photo.size > 1000000) {
            return res.status(400).send({
                ok: false,
                message: "Image should be less than 1mb"
            });
        }
        
        const product=new productModel({...req.fields,slug:slugify(name) })
        console.log(product);

        if(photo){
            const buffer=fs.readFileSync(photo.path);
            product.photo.data=buffer;
            product.photo.contentType=photo.type;
        }
        await product.save();

        res.status(200).send({
            ok:true,
            message:"Product created successfully",
            product
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error creating product"
        });
    }
}


//Get all products
export const getAllProductsController=async(req,res)=>{
    try{
        const products=await productModel.find({}).select("-photo").limit(10).sort({createdAt:-1}).populate("category") ;
        res.status(200).send({
            ok:true,
            totalCounts:products.length,
            message:"Products fetched successfully",
            products
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error getting products"
        });
    }
}
//Get all products
export const getSingleProductController=async(req,res)=>{
    try{
        const product=await productModel.find({slug:req.params.slug}).select("-photo").populate("category","_id name").exec();
        res.status(200).send({
            ok:true,
            message:"Product fetched successfully",
            product
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error getting a product"
        });
    }
}

//Get product photo
export const productPhotoController=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error getting a product photo"
        });
    }
}

//Delete product photo
export const deleteProductPhotoController=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            ok:true,
            message:"Product photo deleted successfully",
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error deleting a product photo"
        });
    }
}

//Update product
export const updateProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;

        if (!name) {
            return res.status(400).send({ 
                ok: false,
                message: "Name is required"
            });
        } else if (!description) {
            return res.status(400).send({
                ok: false,
                message: "Description is required"
            });
        } else if (!price) {
            return res.status(400).send({
                ok: false,
                message: "Price is required"
            });
        } else if (!category) {
            return res.status(400).send({
                ok: false,
                message: "Category is required"
            });
        } else if (!quantity) {
            return res.status(400).send({
                ok: false,
                message: "Quantity is required"
            });
        } else if (photo && photo.size > 1000000) {
            return res.status(400).send({
                ok: false,
                message: "Image should be less than 1mb"
            });
        }
        
        const product=await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name) },{new:true})
        console.log(product);

        if(photo){
            const buffer=fs.readFileSync(photo.path);
            product.photo.data=buffer;
            product.photo.contentType=photo.type;
        }
        await product.save();

        res.status(200).send({
            ok:true,
            message:"Product updated successfully",
            product
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            ok:false,
            err,
            message:"Error updating product"
        });
    }
}