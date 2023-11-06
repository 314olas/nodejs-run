import * as dotenv from 'dotenv';
dotenv.config();

import mongoose, { connect } from "mongoose";
import * as process from "process";

const connectDB = async () => {
    try {
        const mongoURI: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

        await connect(mongoURI, {
            authSource: 'admin',
            user: process.env.MONGO_USER || 'mongoadmin',
            pass: process.env.MONGO_PASS || 'bdung',
        });
        mongoose.set('debug', true);
        console.log("MongoDB Connected...");
    } catch (err: any) {
        console.error(err.message);

        // Exit process with failure
        process.exit(1);
    }
};
export default connectDB;
