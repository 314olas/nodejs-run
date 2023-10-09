import { CART_DB, ORDER_DB } from '../constants';
import { getProduct } from '../product/product.repository';
import { Cart, Order } from '../types';
import { calculateTotalPrice, getUpdatedCart, readFromFile, writeToFile } from '../utils';

async function getUserCartsCartById(userId: number): Promise<{carts: Cart[], currentCart: Cart | null, cartIndex: number}> {
    const carts = await readFromFile<Cart[]>(CART_DB);
    let cartIndex: number = -1;
    const currentCart = carts.find( (cart, index) => {
        if (cart.userId === userId && cart.status === 'created') {
            cartIndex = index;
            return true
        }
    }) || null

    return {
        carts,
        currentCart,
        cartIndex
    }
}

export const getCartByUserId = async (userId: number): Promise<Cart>  => {
    const {carts, currentCart} = await getUserCartsCartById(userId)
    if (!currentCart) {
        const newCart: Cart = {
            id: Date.now(),
            items: [],
            status: 'created',
            userId
        }
        await writeToFile(CART_DB, [...carts, newCart]);
        return newCart;
    }

    return currentCart;
    
}

export const deleteCartByUserId = async (userId: number): Promise<void>  => {
    const {carts, currentCart, cartIndex} = await getUserCartsCartById(userId);
    if (cartIndex !== -1 && currentCart) {
        carts[cartIndex] = {
            ...currentCart,
            status: 'deleted'
        };
        
        await writeToFile(CART_DB, carts);
    }
}

export const updateUserCart = async (userId: number, {productId, count}: {productId: number, count: number}): Promise<Cart | null> => {
    const {carts, currentCart, cartIndex} = await getUserCartsCartById(userId);

    if (cartIndex === -1 || !currentCart) {
        return null;
    }

    const product = await getProduct(productId)

    if (!product) {
        throw new Error('Invalid Product ID');
    }
    
    const updatedCart = getUpdatedCart(currentCart, count, product)
    carts[cartIndex] = updatedCart;
    await writeToFile(CART_DB, carts);

    return updatedCart;
}


export const createOrderFromCart = async (userId: number): Promise<Order | null> => {
    const {carts, currentCart} = await getUserCartsCartById(userId);

    if (currentCart) {
        const order: Order = {
            id: Date.now(),
            cartId: currentCart.id,
            items: currentCart.items,
            status: 'created',
            userId,
            totalPrice: calculateTotalPrice(currentCart)
        };
        const orders = await readFromFile<Order[]>(ORDER_DB);
        await writeToFile(ORDER_DB, [...orders, order]);
        await deleteCartByUserId(userId);

        return order
    }

    return null
}