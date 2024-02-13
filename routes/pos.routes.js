import express from 'express';
import { uploadSingleImage } from '../services/cloudinary.js';
import { addProducts, getProducts } from '../controllers/pos.controller.js';


const posRouter = express.Router()

posRouter.post('/add-product',uploadSingleImage,addProducts)

posRouter.get('/get-products',getProducts)

export default posRouter;