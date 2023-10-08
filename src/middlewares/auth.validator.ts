import { NextFunction, Request, Response } from "express";
import { getUserIdFromHeaders } from "../utils";

export const checkUserIdHeader = (req: Request, res: Response, next: NextFunction) => {
    const userIdHeader = getUserIdFromHeaders(req);

    if (!userIdHeader) {
        res.status(403);
        return res.send({data: null, error: 'You have to be authorized'});
    } 

    next();
}