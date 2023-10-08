import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import './Db/conn.js'; 
app.use(express.json());


// Importing routes for mouning 
import {userRoute} from './routes/userRoute.js' 
import { productRoute } from './routes/productRoute.js';
import { cartRoute } from './routes/cartRoute.js';
import { orderRoute } from './routes/orderRoute.js';

app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',orderRoute)

const port = process.env.PORT;
app.listen(port , () => {
    console.log(`Server is running on the port ${port}`)
})