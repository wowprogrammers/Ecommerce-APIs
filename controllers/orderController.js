import { Order } from "../models/orderSchema.js";

const createOrder = async(req,res) => {
    try {
        const {userId,products,status,orderDate} = req.body;
        
        const order = await Order.create({
            userId,
            products,
            status,
            orderDate
        })

        if(order){
            res.status(201).json({
                status:"Success",
                order

            })
        }

    } catch (error) {
        res.status(401).json({Error:error.message});
    }
}
// Check Out API
const orderOfSpecificUser = async(req,res) => {
    try {
        const userId = req.params.userId;

        const orderOfUser = await Order.findOne({userId})
        .populate({
            path:"userId",
            model:"User",
            select:"-__v"
        })
        .populate({
            path:"products.product",
            model:"Product",
            select:"-__v"
        });
        if(orderOfUser){
            return res.status(200).json({
                status:"Success",
                order:orderOfUser
            })
        }

    } catch (error) {
        res.status(400).json({Error:error.message});
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

// Update the order status 
const orderPlaced = async(req,res) => {
    try {
        const orderId = req.params.orderId;

        if(!orderId){
            return res.status(404).json({Error:"Order with this ID does not exist"});
        }

        const filterdBody = FilterObj(req.body,'status');

        const updateOrder = await Order.findByIdAndUpdate(orderId,filterdBody,{
            new:true
        })

        if(updateOrder){
            return res.status(200).json({
                status:"Success",
                message:"Your Order is Confirmed"
            })
        }

    } catch (error) {
        res.status(400).json({Error:error.message})
    }
}

export {createOrder,orderOfSpecificUser,orderPlaced}