import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import User, {IUser} from "./user.entity";
import Product, {IProduct} from "./product.entity";
import Cart, {ICart} from "./cart.entity";
import CartItem, {ICartItem} from "./cartItem.entity";
import { OrderStatus } from "../types";

export type TOrder = {
    user: IUser['id']
    cart: ICart['id']
    items: ICartItem[]
    payment: {
        type: string,
        address?: string,
        creditCard?: string,
    },
    delivery: {
        type: string,
        address: string,
    },
    comments: string,
    status: OrderStatus;
    total: number;
};

export interface IOrder extends TOrder, Document {}

const orderSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },
    user: {
        type: Schema.Types.String,
        ref: User,
        required: true,
    },
    cart: {
        type: Schema.Types.String,
        ref: Cart
    },
    items: {
        type: Schema.Types.Array,
    },
    payment: {
        type: {
            type: Schema.Types.String,
            required: true,
        },
        address: {
            type: Schema.Types.String,
            required: false,
        },
        creditCard: {
            type: Schema.Types.String,
            required: false,
        },
    },
    delivery: {
        type: {
            type: Schema.Types.String,
            required: true,
        },
        address: {
            type: Schema.Types.String,
            required: false,
        },
    },
    comments: {
        type: Schema.Types.String,
        required: false,
    },
    status: {
        type: Schema.Types.String,
        enum: OrderStatus,
    },
    total: {
        type: Schema.Types.Number,
        required: true,
    },

});

const Order = model<IOrder>("Order", orderSchema);

export default Order;


