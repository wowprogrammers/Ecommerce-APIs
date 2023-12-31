import express from 'express';
const orderRoute = express.Router();
import  * as orderController from '../controllers/orderController.js';


orderRoute.post('/',orderController.createOrder);
orderRoute.get('/:userId',orderController.orderOfSpecificUser)
orderRoute.put('/orderId',orderController.orderPlaced);

export  {orderRoute}