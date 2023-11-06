import {Document, Model, model, Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import User, {IUser} from "./user.entity";
import CartItem, {ICartItem} from "./cartItem.entity";


export type TCart = {
    user: IUser['id']
    isDeleted: boolean
    items: ICartItem['id'][]
};

export interface ICart extends TCart, Document {}

interface ICartModel extends Model<ICart>{
    findOrCreate: (uuid: string) => Promise<ICart>;
}

const cartSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },
    user: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
    },
    isDeleted: {
        type: Schema.Types.Boolean,
        default: false,
    },
    items: [{
        ref: 'CartItem',
        type: Schema.Types.String,
    }],
});

const Cart = model<ICart, ICartModel>("Cart", cartSchema);

export default Cart;
