import express from 'express';
import { uploadSingleImage } from '../services/cloudinary.js';
import { addProudcts } from '../controllers/pos.controller.js';

const posRouter = express.Router()

posRouter.post('/add-product',uploadSingleImage,addProudcts)

export default posRouter;