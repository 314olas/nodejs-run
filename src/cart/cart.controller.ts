import express from "express";
import { Response, Request } from "express-serve-static-core";
import { cartService } from "./cart.service";
import { getUserIdFromHeaders } from "../utils";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {    
    try {
        const userId = getUserIdFromHeaders(req);      
        if (userId) {
            const cart = await cartService.getUserCart( userId );
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
            await cartService.deleteUserCart(userId);
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

router.put('/', async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromHeaders(req);

        if (userId) {
            const cart = await cartService.updateUserCartItems(userId, {productId: 2, count: 2});
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
            const order = await cartService.createOrderFromCart(userId);
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