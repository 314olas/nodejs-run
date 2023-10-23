import { Entity, OneToOne, PrimaryKey } from "@mikro-orm/core";
import {Cart} from "./cart.entity";

@Entity()

export class User {
    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @OneToOne(() => Cart,cart => cart.user, { owner: false })
    cart?: Cart;

}
