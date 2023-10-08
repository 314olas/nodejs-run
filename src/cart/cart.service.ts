import { validateCartUpdate } from "../utils";
import { deleteCartByUserId, getCartByUserId, updateUserCart, createOrderFromCart } from "./cart.repository";

class CartService {

    async getUserCart(userID: number) {

        const {userId, status, ...cart} = await getCartByUserId(userID);
        return cart
    }

    async deleteUserCart(userID: number) {
        return await deleteCartByUserId(userID);
    }

    async updateUserCartItems(userID: number, data: {productId: number, count: number}) {
        await validateCartUpdate().validateAsync(data);
        return await updateUserCart(userID, data)
    }

    async createOrderFromCart(userID: number) {
        return await createOrderFromCart(userID)
    }
    
}

export const cartService =  new CartService();