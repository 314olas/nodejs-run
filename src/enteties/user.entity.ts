import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4, stringify as uuidStringify } from 'uuid';

export type TUser = {
    username: string
};

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    }
});

const User = model<IUser>("User", userSchema);

export default User;
