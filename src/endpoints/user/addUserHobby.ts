import {IncomingMessage, ServerResponse} from 'http'
import { UserService } from '../../userService';
import { getUserIdFromRequest, parsBodyRequest } from '../../utils';
import { PATHS } from '../../constants';

export function addUserHobbyRoute(req: IncomingMessage, res: ServerResponse) {
    const userService = UserService.getInstance();
    const userId: number = getUserIdFromRequest(req, res, PATHS.userHobby);

    parsBodyRequest(req, res, (hobby: string) => {      
        const user = userService.addHobbyToUser(userId, hobby);
        if (user && Object.keys(user).length) {
            res.statusCode = 200;
            res.end(JSON.stringify(user));
            return;
        } else {
            res.statusCode = 404;
            res.end('User not found')
        }
    })
}