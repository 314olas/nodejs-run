import {IncomingMessage, ServerResponse} from 'http'
import { UserService } from '../../userService';
import { User } from '../../types';
import { getUserIdFromRequest, parsBodyRequest } from '../../utils';
import { PATHS } from '../../constants';

export function updateUserByIdRoute(req: IncomingMessage, res: ServerResponse) {
    const userService = UserService.getInstance();
    const userId: number = getUserIdFromRequest(req, res, PATHS.userId);

    parsBodyRequest(req, res, (user: Partial<Omit<User, "id">>) => {
        const newUser = userService.updateUser(userId, user);
        
        if (newUser) {
            res.statusCode = 200;
            res.end(JSON.stringify(newUser));
            return;
        }

        res.statusCode = 404;
        res.end('User not found')
    })
}