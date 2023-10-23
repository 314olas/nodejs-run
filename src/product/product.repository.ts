import { DI } from '..';
import { PRODUCT_DB } from '../constants';
import { Product } from '../types';
import { readFromFile } from '../utils';

export async function getAllProducts() {
    return await DI.productRepository.findAll({
        limit: 20,
    });
}

export const getProduct = async (productId: string)  => {
    return await DI.productRepository.findOneOrFail(productId);
}
