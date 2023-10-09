import {getAllProducts, getProduct} from './product.repository'

class ProductService {

    async getAllProducts() {
        return getAllProducts();
    }

    async getProduct(productId: number) {
        return getProduct(productId)
    }
    
}

export const productService =  new ProductService();