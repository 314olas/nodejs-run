import { DI } from '..';
import { Cart } from '../enteties/cart.entity';
import { CartItem } from '../enteties/cartItem.entity';
import { Order } from '../enteties/order.entety';

export const getCartByUserId = async (userId: string)  => {
    const cart = await DI.cartRepository.findOne(
        { user: { uuid: userId } },
        { populate: ["items"] }
      );

    if (!cart) {
        const user = await DI.userRepository.findOneOrFail({uuid: userId});

        if (user) {
            const newCart = new Cart();
            newCart.user = user;
            await DI.cartRepository.persistAndFlush(newCart);
            return newCart;
        }
    }

    return cart;
}

export const deleteCartByUserId = async (userId: string)  => {
    const user = await DI.userRepository.findOneOrFail({uuid: userId});
    const cart = await DI.cartRepository.findOneOrFail({user: user},{populate: ['items']});
    cart.items.removeAll();
    await DI.cartRepository.flush();
    return cart;

}

export const updateUserCart = async (userId: string, {productId, count}: {productId: string, count: number}) => {
    const product = await DI.productRepository.findOne({uuid: productId});
    const user = await DI.userRepository.findOneOrFail({uuid: userId});
    const cart = await DI.cartRepository.findOne({user: user},{populate: ['items']});

    if (!cart) throw new Error('Cart was not found');
    if (!product) throw new Error('Products are not valid');

    const cartItem = await DI.cartItemRepository.findOne({cart: cart, product: product});

    if (cartItem) {
        cartItem.count += count;
        await DI.cartItemRepository.flush();
        await DI.cartRepository.flush();
        return cart;
    }

    const newCartItem = new CartItem();
    newCartItem.count = count;
    newCartItem.product = product;
    cart.items.add(newCartItem);
    await DI.cartRepository.flush();

    return cart;
}


export const createOrderFromCart = async (userId: string) => {
    const user = await DI.userRepository.findOneOrFail({uuid: userId});
    const cart = await DI.cartRepository.findOne({user: user}, {populate: ['items.product']});

    if(!cart) {
        throw new Error('Not Found');
    }

    if(cart.items.length === 0) {
        throw new Error('Cart is empty');
    }

    const payment = await DI.paymentRepository.findOneOrFail({type: 'paypal'})
    const delivery = await DI.deliveryRepository.findOneOrFail({type: 'Nova Post'})

    const order = new Order();
    order.user = user;
    order.cart = cart;
    order.items = cart.items.toJSON();
    order.payment = payment;
    order.delivery = delivery;

    await DI.orderRepository.persistAndFlush(order);
    return order;

}