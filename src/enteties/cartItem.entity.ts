import { Entity, ManyToOne, PrimaryKey, Property, Ref} from "@mikro-orm/core";
import {Product} from "./product.entity";
import {Cart} from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property()
    count!: number;

    @ManyToOne(() => Product, { nullable: false})
    product!: Product;

    @ManyToOne(() => Cart, { nullable: false, ref: true })
    cart!: Ref<Cart>;
}