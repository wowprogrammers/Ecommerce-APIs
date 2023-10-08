import { Product } from "../models/productSchema.js";


const createProduct = async(req,res) => {
    try {
        const {productTitle,productDescription,price,category,Image,quantity} = req.body;
        ``
        const product = await Product.create({
            productTitle,
            productDescription,
            price,
            category,
            Image,
            quantity
        })

        if(product){
            return res.status(201).json({
                status:"Success",
                product
            })
        }

    } catch (error) {
        res.status(400).json({Error:error.message});
    }
}


export {createProduct}