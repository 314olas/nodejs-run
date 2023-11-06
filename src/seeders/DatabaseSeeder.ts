import Product from "../enteties/product.entity";
import User from "../enteties/user.entity";
import connectDB from "../mongo.config";

export const init = (async () => {
    await connectDB();

    const user = await new User({
        username: 'Vasyl',
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

