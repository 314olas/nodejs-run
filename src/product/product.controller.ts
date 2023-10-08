import { Response, Request } from "express-serve-static-core";
import express from "express";
import { getUserIdFromHeaders } from "../utils";
import { productService } from "./product.service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {    
    try {
        const allProducts = await productService.getAllPruducts();
        if (allProducts?.length) {
            res.json({data: allProducts, error: null});
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

router.get('/:productId', async (req: Request, res: Response) => {
    try {
        const productId = +req.params.productId;        
        if (productId) {
            const product = await productService.getProduct(productId);
            res.json({data: product, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }
})

export const productRouter = router;