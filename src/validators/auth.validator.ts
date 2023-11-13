import Joi from "joi"
import { UserRole } from "../types";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const LoginPostSchema = () => {
    return loginSchema;
} 

export const RegisterPostSchema = () => {
    return loginSchema.append({
        role: Joi.string().valid(...Object.values(UserRole)).required(),
    })
};
