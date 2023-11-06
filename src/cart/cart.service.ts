import { deleteCartByUserId, getCartByUserId, updateUserCart } from "./cart.repository";

class cartService {
    async getUserCart(userID: string) {

        const cart = await getCartByUserId(userID);
        return cart
    }

    async deleteUserCart(userID: string) {
        return deleteCartByUserId(userID);
    }

    async updateUserCartItems(userID: string, data: {productId: string, count: number}) {
        return updateUserCart(userID, data)
    }

    async createOrderFromCart(userID: string) {
        return this.createOrderFromCart(userID)
    }
    
}

export const CartService =  new cartService();