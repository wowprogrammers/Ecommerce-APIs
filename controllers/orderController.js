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

export {createOrder}