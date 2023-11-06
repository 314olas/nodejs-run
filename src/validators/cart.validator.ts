import Joi from "joi"

export const CartUpdateSchema = () => {
    return Joi.object({
        productId: Joi.string().required(), count: Joi.number().min(1).required()
    })
} 