import {Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Payment{
    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property()
    type!: string;

    @Property({nullable: true})
    address?: string;

    @Property({nullable: true})
    creditCard?: string;
}
