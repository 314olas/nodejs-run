import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Delivery{
    @PrimaryKey({type: "uuid", defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property()
    type!: string;

    @Property()
    address!: string;
}
