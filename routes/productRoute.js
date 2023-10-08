import express  from "express";
const productRoute = express.Router();
import * as productController from '../controllers/productController.js'
productRoute.post('/',productController.createProduct)



export {productRoute};