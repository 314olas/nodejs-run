import {Collection, Entity, OneToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import {SoftDeletable} from "mikro-orm-soft-delete";
import {User} from "./user.entity";
import {CartItem} from "./cartItem.entity";

@SoftDeletable(() => Cart, 'isDeleted', () => true)
@Entity()
export class Cart {

    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property({default: false})
    isDeleted!: boolean;

    @OneToOne(() => User,user => user.cart, { owner: true } )
    user!: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, {nullable: true, default: [], orphanRemoval: true})
    items = new Collection<CartItem>(this);
}
