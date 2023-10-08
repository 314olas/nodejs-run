import { NextFunction, Request, Response } from "express";
import fs from 'fs/promises'
import Joi from "joi";

export const getUserIdFromHeaders = (req: Request): number | null => {
    const userId = req.headers['x-user-id'];

    if (userId) {
        return +userId;
    }

    return null;
}

export const readFromFile = async <T>(filePath: string): Promise<T> => {
    return await fs.readFile(filePath).then(data => {
        return JSON.parse(data.toString()) as T
    });
}

export const writeToFile = async <T>(filePath: string, data: T): Promise<void> => {
    return await fs.writeFile(filePath, JSON.stringify(data))
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const userIdHeader = getUserIdFromHeaders(req);

    if (!userIdHeader) {
        res.status(403);
        return res.send({data: null, error: 'You have to be authorized'});
    } 

    next();
}

export const validateCartUpdate = () => {
    return Joi.object({
        productId: Joi.number(), count: Joi.number()
    })
} 