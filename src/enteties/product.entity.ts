import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Product } from "../types";

export type TProduct = Omit<Product, 'id'>

export interface IProduct extends TProduct, Document {}

const productSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },
    title: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    description: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
