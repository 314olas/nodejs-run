import Product from "../enteties/product.entity";


export async function getAllProducts() {
    return Product.find();
}

export const getProduct = async (productId: string)  => {
    return await Product.findById(productId)
}
