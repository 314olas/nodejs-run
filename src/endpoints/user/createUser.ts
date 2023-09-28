import {IncomingMessage, ServerResponse} from 'http'
import { UserService } from '../../userService';
import { User } from '../../types';
import { parsBodyRequest } from '../../utils';

export function createUserByIdRoute(req: IncomingMessage, res: ServerResponse) {
    const userService = UserService.getInstance();

    parsBodyRequest(req, res, (user: Omit<User, "id">) => {
        const newUser = userService.createUser(user);
        res.statusCode = 200;
        res.end(JSON.stringify(newUser));
    })
}