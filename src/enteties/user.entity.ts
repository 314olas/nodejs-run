import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4, stringify as uuidStringify } from 'uuid';
import bcrypt from "bcrypt";
import { TUser, UserRole } from "../types";

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuidv4,
        alias: 'id',
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        enum: UserRole,
    }
});

userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    next();
})

const User = model<IUser>("User", userSchema);

export default User;
