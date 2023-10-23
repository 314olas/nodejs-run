import {Enum, Entity, ManyToOne, PrimaryKey, Property, BeforeCreate, JsonType, EntityDTO} from "@mikro-orm/core";
import {Cart} from "./cart.entity";
import {User} from "./user.entity";
import {CartItem} from "./cartItem.entity";
import {Delivery} from "./delivery.entity";
import {Payment} from "./payment.entity";
import { OrderStatus } from "../types";

@Entity()
export class Order {

    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @ManyToOne(() => Cart, { onDelete: "cascade", ref: true,  fieldName: 'cartId' })
    cart!: Cart;

    @ManyToOne(() => User, { onDelete: "cascade", ref: true,  fieldName: 'userId' })
    user!: User;

    @ManyToOne(() => Delivery, { onDelete: "cascade", ref: true })
    delivery!: Delivery;

    @ManyToOne(() => Payment, { onDelete: "cascade", ref: true })
    payment!: Payment;

    @Property({ type: JsonType })
    items!: EntityDTO<CartItem[]>;

    @Property()
    comments?: string;

    @Property()
    total!: number;

    @Enum(() => OrderStatus)
    status!: OrderStatus;
    order: any;

    constructor(comments: string = '' ) {
        this.comments = comments
    }

    @BeforeCreate()
    async beforeCreate() {
        this.status = OrderStatus.CREATED;
        this.total = <number> this.cart?.items?.reduce((acc: number, item: CartItem) => (item.count * item.product.price) + acc, 0);
    }
}

