import express from 'express';

import { cartRouter } from './cart/cart.controller';
import { productRouter } from './product/product.controller';
import { checkUserIdHeader } from './middlewares/auth.validator';
import connectDB from './mongo.config'

const port = process.env.PORT || 3000;

const app = express();

export const init = (async () => {
    await connectDB();
    app.use(express.json());

    app.use(checkUserIdHeader);
    
    app.use('/api/cart', cartRouter);
    
    app.use('/api/products', productRouter);

    app.listen(port, () => {});
})()