import Cart from "../enteties/cart.entity";
import CartItem, { ICartItem } from "../enteties/cartItem.entity";
import Order from "../enteties/order.entety";
import Product from "../enteties/product.entity";
import User from "../enteties/user.entity";
import { OrderStatus } from "../types";



export const getCartByUserId = async (userId: string)  => {
    const user = await User.findById(userId);
    let result;

    if (user && user.id) {
        result = await Cart.findOne({user: user.id}).populate({
            path: 'items',
            model: 'CartItem',
        });

        if (!result) {
            result = await Cart.create({
                user: user.id,
            });
        }

        return result;
    }
}

export const deleteCartByUserId = async (userId: string)  => {
    const user = await User.findById(userId);

    if (user && user.id) {
        const cart = await Cart.findOneAndUpdate({user: user.id}, {items: []}, {new: true});
        if (cart) {
            await CartItem.deleteMany({cart: cart.id});

        }
        return cart;
    }
    
}

export const updateUserCart = async (userId: string, {productId, count}: {productId: string, count: number}) => {
    const user = await User.findById(userId);

    if (user && user.id) {
        const product = await Product.findById(productId).exec();
        const cart = await Cart.findOne({user: user.id}).populate({
            path: 'items',
            model: 'CartItem',
        })
        .populate({
            path: 'user',
            model: 'User',
        }).exec();

        if (!cart) throw new Error('Cart was not found');
        if (!product) throw new Error('Products are not valid');
    
        const cartItem = await CartItem.findOne({cart: cart.id, product: product.id}).exec();
    
        if (cartItem) {
            cartItem.count += count;
            await cartItem.save();
            return cart;
        }
    
        const item = await CartItem.create({
            count,
            product: product.id,
            cart: cart.id,
        });
        cart.items.push(item);
        await cart.save();
    
        return cart;
    }
}

export const createOrderFromCart = async (userId: string) => {
    const user = await User.findById(userId);
    const cart = await Cart.findOne({user: user}).populate({
        path: 'items',
        populate: {
            path: 'product',
            model: 'Product',
        },
    });

    if(!cart) {
        throw new Error('Not Found');
    }

    if(cart.items.length === 0) {
        throw new Error('Cart is empty');
    }

    const order = new Order;
    if (user && user.id) { 
        order.user = user.id;
        order.cart = cart.id;

        // @ts-ignore
        order.items = JSON.stringify(cart.items);
        order.payment = {
            type: 'paypal',
            address: 'Shevchenko 25',
            creditCard: '1254 2555 4856 1235',
        };
        order.delivery = {
            type: 'NovaPost',
            address: 'Shevchenko 25',
        };
        order.comments = 'Handle with care';
        order.status = OrderStatus.CREATED;
        order.total = cart.items.reduce((acc: number, item: ICartItem) => (item.count * item.product.price) + acc, 0);

        await order.save();

        return order;
    }

}