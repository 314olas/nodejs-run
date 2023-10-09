import { NextFunction, Request, Response } from "express";
import { CartUpdateSchema } from "../validators";

export const checkUpdateCartReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CartUpdateSchema().validateAsync(req.body)
        next()
    } catch (error) {
        return res.send({data: null, error: 'request body is not correct'});
    } 

    next();
}