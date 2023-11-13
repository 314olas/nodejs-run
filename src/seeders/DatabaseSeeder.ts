import Product from "../enteties/product.entity";
import User from "../enteties/user.entity";
import connectDB from "../mongo.config";
import { UserRole } from "../types";

export const init = (async () => {
    await connectDB();

    const user = await new User({
        email: 'vasyl@example.com',
        password: 'qwerty123',
        role: UserRole.ADMIN
    }).save();
    console.log('User id: ', user.id);

    const product = await new Product({
        title: 'Harley',
        description: 'Cool bike',
        price: 10,
    }).save();
    console.log('Product id: ', product.id);

    process.exit(1);
})();

