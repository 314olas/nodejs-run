import { deleteCartByUserId, getCartByUserId, updateUserCart, createOrderFromCart } from "./cart.repository";

class CartService {

    async getUserCart(userID: number) {

        const {userId, status, ...cart} = await getCartByUserId(userID);
        return cart
    }

    async deleteUserCart(userID: number) {
        return deleteCartByUserId(userID);
    }

    async updateUserCartItems(userID: number, data: {productId: number, count: number}) {
        return updateUserCart(userID, data)
    }

    async createOrderFromCart(userID: number) {
        return createOrderFromCart(userID)
    }
    
}

export const cartService =  new CartService();