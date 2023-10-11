import express from 'express';
const cartRoute = express.Router();
import * as cartController from '../controllers/cartController.js';

cartRoute.post('/',cartController.addToCart);
cartRoute.get('/:userId',cartController.userCartScreen);
cartRoute.put('/:cartId',cartController.updateCart);
cartRoute.delete('/:cartId',cartController.deleteCartItem);

export {cartRoute}