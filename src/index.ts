import express from 'express';
import http from 'http';
import {EntityManager, EntityRepository, MikroORM, PostgreSqlDriver} from "@mikro-orm/postgresql"
import 'reflect-metadata';

import { cartRouter } from './cart/cart.controller';
import { productRouter } from './product/product.controller';
import { checkUserIdHeader } from './middlewares/auth.validator';
import config from './mikro-orm.config'
import { User } from './enteties/user.entity';
import { Product } from './enteties/product.entity';
import { Cart } from './enteties/cart.entity';
import { CartItem } from './enteties/cartItem.entity';
import { Order } from './enteties/order.entety';
import { Delivery } from './enteties/delivery.entity';
import { Payment } from './enteties/payment.entity';
import { RequestContext } from '@mikro-orm/core';

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    productRepository: EntityRepository<Product>,
    cartRepository: EntityRepository<Cart>,
    cartItemRepository: EntityRepository<CartItem>,
    orderRepository: EntityRepository<Order>,
    deliveryRepository: EntityRepository<Delivery>,
    paymentRepository: EntityRepository<Payment>,
};

const port = process.env.PORT || 3000;

const app = express();

export const init = (async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.productRepository = DI.orm.em.getRepository(Product);
    DI.cartRepository = DI.orm.em.getRepository(Cart);
    DI.cartItemRepository = DI.orm.em.getRepository(CartItem);
    DI.orderRepository = DI.orm.em.getRepository(Order);
    DI.deliveryRepository = DI.orm.em.getRepository(Delivery);
    DI.paymentRepository = DI.orm.em.getRepository(Payment);

    app.use(express.json());

    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    app.use(checkUserIdHeader);
    
    app.use('/api/cart', cartRouter);
    
    app.use('/api/products', productRouter);

    DI.server = app.listen(port, () => {});
})()