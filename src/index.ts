import express from 'express';
import { cartRouter } from './cart/cart.controller';
import { productRouter } from './product/product.controller';
import { checkUserIdHeader } from './middlewares/auth.validator';

const app = express();

app.use(checkUserIdHeader);

app.use('/api/cart', cartRouter);

app.use('/api/products', productRouter);

app.listen(3030, () => {});
