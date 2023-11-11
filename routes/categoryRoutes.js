import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";
import {
    createCategoryController,
    updateCategoryController,
    getCategoriesController,
    getSingleCategoryController,
    deleteCategoryController
} from "../controllers/createCetegoryController.js"; 
import { get } from "mongoose";

const router = express.Router();

router.post("/create-category", requireSignIn,isAdmin,createCategoryController);


router.put("/update-category/:id", requireSignIn,isAdmin,updateCategoryController);

router.get("/get-all-categories", getCategoriesController)

//Single category
router.get("/singleCategory/:slug", getSingleCategoryController)

//Delete category
router.delete("/delete-category/:id", requireSignIn,isAdmin,deleteCategoryController);



export default router;

