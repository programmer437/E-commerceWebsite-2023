import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:true
    },
    slug: {
        type: String,
        unique: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        
        required: true,
       
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number
    },

    photo: {
        data: Buffer,
        contentType: String 
    },
    shipping: {
        type: Boolean,
    },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
    