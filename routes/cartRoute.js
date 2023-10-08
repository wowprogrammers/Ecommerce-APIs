import express from 'express';
const cartRoute = express.Router();
import * as cartController from '../controllers/cartController.js';

cartRoute.post('/',cartController.addToCart);
cartRoute.get('/:userId',cartController.userCartScreen)


export {cartRoute}