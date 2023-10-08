import express from 'express';
const userRoute = express.Router();
import  * as userController from '../controllers/userController.js';


userRoute.post('/',userController.signUp);
userRoute.get('/:id',userController.getUserById)
userRoute.put('/:id',userController.updateUser)

export  {userRoute}