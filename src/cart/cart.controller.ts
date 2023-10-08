import express, { Response, Request } from "express";
import { CartService } from "./cart.service";
import { getUserIdFromHeaders } from "../utils";
import { checkUpdateCartReq } from "../middlewares/updateCart.valodator";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {    
    try {
        const userId = getUserIdFromHeaders(req);      
        if (userId) {
            const cart = await CartService.getUserCart( userId );
            res.json({data: cart, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromHeaders(req);
        if (userId) {
            await CartService.deleteUserCart(userId);
            res.json({data: {success: true}, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

router.put('/', checkUpdateCartReq, async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromHeaders(req);

        if (userId) {
            const cart = await CartService.updateUserCartItems(userId, {productId: '2', count: 2});
            res.json({data: cart, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

router.post('/checkout', async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromHeaders(req);

        if (userId) {
            const order = await CartService.createOrderFromCart(userId);
            res.json({data: order, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

export const cartRouter = router;