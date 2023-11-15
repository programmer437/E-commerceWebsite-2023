import express from 'express';
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"
import { 
    createProductController,
    getAllProductsController,
    getSingleProductController,
    productPhotoController,
    deleteProductPhotoController,
    updateProductController
} from '../controllers/productController.js';
import formidable from "express-formidable-v2"

const router = express.Router();

//routes     

//Create Product
router.post("/create-product",requireSignIn,isAdmin,formidable(), createProductController);

//Update Product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(), updateProductController);

//Get all products
router.get("/get-products",getAllProductsController);

//Get one product
router.get("/get-products/:slug",getSingleProductController);

router.get("/product-photo/:pid",productPhotoController);


//delete product
router.delete("/deleteProduct/:pid",deleteProductPhotoController);



export default router;