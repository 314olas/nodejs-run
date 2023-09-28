import {IncomingMessage, ServerResponse} from 'http'
import { UserService } from '../../userService';

export function getAllUsersRoute(req: IncomingMessage, res: ServerResponse) {
    const userService = UserService.getInstance();
    const users = userService.getAllUsers();

    if (users.length) {
        res.statusCode = 200;
        res.end(JSON.stringify(users));
        return;
    } else {
        res.statusCode = 404;
        res.end('No users was found')
    }
}