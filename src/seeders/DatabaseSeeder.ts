import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../enteties/user.entity';
import { Product } from '../enteties/product.entity';
import { Cart } from '../enteties/cart.entity';
import { Delivery } from '../enteties/delivery.entity';
import { Payment } from '../enteties/payment.entity';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {});
    const product = em.create(Product, {
      title: 'Product 1',
      description: 'Product 1 description',
      price: 19,
    });
    const cart = em.create(Cart, {
      isDeleted: false,
      user: user,
    });
    const delivery = em.create(Delivery, {
      type: 'Nova Post',
      address: 'Poleva, 5',
    });
    const payment = em.create(Payment, {
      type: 'paypal',
      address: 'Poleva, 5',
      creditCard: '5234 1535 1255 1239',
    });
  }
}
