import { PRODUCT_DB } from '../constants';
import { Product } from '../types';
import { readFromFile } from '../utils';

export async function getAllProducts(): Promise<Product[]> {
    return await readFromFile<Product[]>(PRODUCT_DB);
}

export const getProduct = async (productId: number): Promise<Product | null>  => {
    const products = await getAllProducts();
    return products.find(product => product.id === productId) || null
}
