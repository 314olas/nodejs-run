import express from 'express';

import { cartRouter } from './cart/cart.controller';
import { productRouter } from './product/product.controller';
import connectDB from './mongo.config'
import { authRouter } from './cart/auth/auth.controller';
import { authUser } from './middlewares/auth.validator';

const port = process.env.PORT || 3000;

const app = express();

export const init = (async () => {
    await connectDB();
    app.use(express.json());

    app.use(authUser);

    app.use('/api', authRouter);
    
    app.use('/api/cart', cartRouter);
    
    app.use('/api/products', productRouter);

    app.listen(port, () => {});
})()