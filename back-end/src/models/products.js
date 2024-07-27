import mongoose from "mongoose";


const productsSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String},
    description: {type: String},
    urlImage: {type: String},
    category: [{
        type: String
    }],
    price: {
        type: Number, 
        required: [true, 'The price field is required.']
    },
    salesCount: { type: Number, default: 0 }
}, { versionKey: false });

export const products = mongoose.model('products', productsSchema);