import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import User from '../../enteties/user.entity';

export const registerUser = async (userDTO: object) => {
    return await await User.create(userDTO);
}

export const loginUser = async (creds: { email: string, password: string }) => {
    const user = await User.findOne({email: creds.email}).exec();

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(creds.password, user.password);

    if (isMatch) {
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY || 'node', {
            expiresIn: '2h',
        });

        return token;
    } else {
        throw new Error('Password is not correct');
    }
}