import { CART_DB, ORDER_DB } from '../constants';
import { getProduct } from '../product/product.repository';
import { Cart, Order } from '../types';
import { readFromFile, validateCartUpdate, writeToFile } from '../utils';

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
    if (cartIndex !== -1 && currentCart) {
        const cartProductIndex = currentCart.items.findIndex( item => item.product.id === productId)
        let updatedCart;
        
        if (count && (cartProductIndex === -1)) {
            const product = await getProduct(productId)
            if (product) {
                updatedCart = {
                    ...currentCart,
                    items: [...currentCart.items, {product: product, count: count}]
                }
            }
            throw new Error('wrong Product Id')
            
        } else if (count && (cartProductIndex !== -1)) {
            currentCart.items[cartProductIndex] = {
                product: currentCart.items[cartProductIndex].product, 
                count: currentCart.items[cartProductIndex].count + count
            };
            updatedCart = {
                ...currentCart,
                items: currentCart.items
            }
        } else {
            updatedCart = {
                ...currentCart,
                items: currentCart.items.filter( cart => cart.product.id !== productId)
            }
        }

        carts[cartIndex] = updatedCart;
        await writeToFile(CART_DB, carts);

        return updatedCart;
    }

    return null
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
            totalprice: currentCart.items.reduce( (totalPrice, cartItem) => {
                return totalPrice + ( cartItem.product.price + cartItem.count)
            }, 0)
        };
        const orders = await readFromFile<Order[]>(ORDER_DB);
        await writeToFile(ORDER_DB, [...orders, order]);
        await deleteCartByUserId(userId);

        return order
    }

    return null
}