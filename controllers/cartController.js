import {Cart} from '../models/cartSchema.js';
import { User } from '../models/userSchema.js';
import {Product} from '../models/productSchema.js'
const addToCart = async(req,res) => {
    try {
        const {userId,productId,quantity} = req.body;
        // Check if valid user Id
        const checkUser = await User.findById(userId);

        if(!checkUser){
            return res.status(403).json({
                status:"Fails",
                Error:"User does not exist Or Invalid User Id"
            })
        }

        // check if valid product id
        const checkProduct = await Product.findById(productId);

        if(!checkProduct){
            return res.status(404).json({
                status:"Fails",
                Error:"Invalid Product Id Or Product does not exist"
            })
        }

        // Check if cart with same userId and productId already added once

        const checkUserCart = await Cart.findOne({userId,productId})
        if(checkUserCart){
            checkUserCart.quantity += 1;
           const cart =  await checkUserCart.save()
           if(cart){ 
            return res.status(201).json({
                status:"success",
                cart
            })
        }
        }

        const cart = await Cart.create({
            userId,
            productId,
            quantity
        })

        if(cart){
            return res.status(201).json({
                status:"success",
                cart
            })
        }
    } catch (error) {
        res.status(400).json({Error:error.message});
    }
}
// Get all cart Items of specific user
const userCartScreen = async(req,res) => {
    try {
        const userId = req.params.userId;

const userCart = await Cart.find({userId})
    .populate({
     path:"userId",
     model:"User",
     select:'-__v'
    })
    .populate({
        path:"productId",
         model:"Product",
         select:"-__v"
     });
   

        if(userCart){
            return res.status(200).json({
                status:"Success",
                length:userCart.length,
                cart:userCart
            })
        }
        
        
    } catch (error) {
        res.status(400).json({Error:error.message})
    }
}
// FilterObj
const FilterObj = (obj,...allowedFields) => {
    // console.log(obj,allowedFields)
    const newObj = {};
    Object.keys(obj).forEach(elem => {
        if(allowedFields.includes(elem)){
            newObj[elem] = obj[elem]
        }
    })
    return newObj
}
const updateCart = async(req,res) => {
    try {
        const cartId = req.params.cartId;

        if(!cartId){
            return res.status(401).json({Error:"Invalid Cart Id"});
        }

        const filteredBody = FilterObj(req.body,'quantity')

        if(filteredBody.quantity > 10){
            return res.status(401).json({Error:"In one order You can not order product Quantity more than 10"})
        }

        const updateCart = await Cart.findByIdAndUpdate(cartId,filteredBody,{
            new:true,
            runValidators:true
        })
        if(updateCart){
            return res.status(200).json({
                status:"Success",
                cart:updateCart
            })
        }
    } catch (error) {
        res.status(400).json({Error:error.message});
    }
}

const deleteCartItem = async(req,res) => {
    try {
        
        const cartId = req.params.cartId;
        if(!cartId){
            return res.status(400).json({Error:"Invalid cart Id"});
        }

        const cartDeleted = await Cart.findByIdAndDelete(cartId);

        if(!cartDeleted){
            return res.status(404).json({Error:"This cart item does not exist"});
        }
        
        if(cartDeleted){
            return res.status(400).json({
                status:"Successfully Deleted",
            })
        }

        if(!cartId){
            return res.status(404).json({Error:error.message});
        }
    } catch (error) {
        res.status(400).json({Error:error.messge})
    }
}

export {addToCart,userCartScreen,updateCart,deleteCartItem}