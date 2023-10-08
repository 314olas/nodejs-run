import express from 'express';
import { cartRouter } from './cart/cart.controller';
import { validate } from './utils';
import { productRouter } from './product/product.controller';

const app = express();

app.use(validate);

app.use('/api/cart', cartRouter);

app.use('/api/products', productRouter);

app.listen(3030, () => {});
