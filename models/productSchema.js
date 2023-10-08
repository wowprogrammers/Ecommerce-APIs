import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        trim:true
    },
    productDescription:{
        type:String,
        trim:true
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
    Image:{
        type:String,
        default:"product.jpg"
    },
    quantity:{
        type:Number
    }


})

const Product = mongoose.model('Product',productSchema);
export {Product};