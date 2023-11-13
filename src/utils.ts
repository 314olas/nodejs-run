import * as dotenv from 'dotenv';
dotenv.config();
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import fs from 'fs/promises'
import { Cart, Product } from './types';
import User from './enteties/user.entity';

export const getUserIdFromHeaders = (req: Request) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
        try {
            // @ts-ignore
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = User.findById(decoded._id);
            return user;
        } catch (error) {
            return null
        }
    }

    return null;
}

export const readFromFile = async <T>(filePath: string): Promise<T> => {
    const data = await fs.readFile(filePath)
    return JSON.parse(data.toString())
}

export const writeToFile = async <T>(filePath: string, data: T): Promise<void> => {
    return await fs.writeFile(filePath, JSON.stringify(data))
}

export const calculateTotalPrice = (cart: Cart): number => {
    const totalPrice = cart.items.reduce( (totalPrice, cartItem) => {
        return totalPrice + ( cartItem.product.price + cartItem.count )
    }, 0);

    return totalPrice
}


export const getUpdatedCart = (cart: Cart, count: number, product: Product) => {
    const cartItems = cart.items
    const cartProductIndex = cartItems.findIndex( item => item.product.id === product.id)
    let updatedCart;
    
    if (count && (cartProductIndex === -1)) {
        updatedCart = {
            ...cart,
            items: [...cartItems, {product: product, count: count}]
        }
        
    } else if (count && (cartProductIndex !== -1)) {
        cartItems[cartProductIndex] = {
            product: cartItems[cartProductIndex].product, 
            count: cartItems[cartProductIndex].count + count
        };
        updatedCart = {
            ...cart,
            items: cartItems
        }
    } else {
        updatedCart = {
            ...cart,
            items: cartItems.filter( cart => cart.product.id !== product.id)
        }
    }

    return updatedCart
}
