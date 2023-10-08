import express from 'express';
const userRoute = express.Router();
import  * as userController from '../controllers/userController.js';


userRoute.post('/',userController.signUp);



export  {userRoute}