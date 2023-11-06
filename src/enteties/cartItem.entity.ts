import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import User, {IUser} from "./user.entity";
import Product, {IProduct} from "./product.entity";
import Cart, {ICart} from "./cart.entity";


export type TCartItem = {
    product: IProduct['id']
    count: number
    cart: ICart['id']
};

export interface ICartItem extends TCartItem, Document {}

const cartItemSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },

    product: {
        type: Schema.Types.String,
        ref: 'Product',
        required: true,
    },
    count: {
        type: Schema.Types.Number,
        required: true,
    },
    cart: {type: Schema.Types.String, ref: 'Cart'}
});
const CartItem = model<ICartItem>("CartItem", cartItemSchema);

export default CartItem;
