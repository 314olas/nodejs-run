import {getAllProducts, getProduct} from './product.repository'

class ProductService {

    async getAllPruducts() {
        return await getAllProducts();
    }

    async getProduct(productId: number) {
        return await getProduct(productId)
    }
    
}

export const productService =  new ProductService();