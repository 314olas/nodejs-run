import { NextFunction, Request, Response } from "express";
import { LoginPostSchema, RegisterPostSchema } from "../validators/auth.validator";
import { getUserIdFromHeaders } from "../utils";

export const checkRegisterReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await RegisterPostSchema().validateAsync(req.body)
        next()
    } catch (error) {
        return res.send({data: null, error: 'request body is not correct'});
    } 

    next();
}


export const checkLoginReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LoginPostSchema().validateAsync(req.body)
        next()
    } catch (error) {
        return res.send({data: null, error: 'request body is not correct'});
    } 

    next();
}

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const userIdHeader = getUserIdFromHeaders(req);

    if (!userIdHeader) {
        res.status(403);
        return res.send({data: null, error: 'You have to be authorized'});
    } 

    next();
}