import Joi from "joi"

export const CartUpdateSchema = () => {
    return Joi.object({
        productId: Joi.number(), count: Joi.number()
    })
} 