import {IncomingMessage, ServerResponse} from 'http'
import { UserService } from '../../userService';
import { getUserIdFromRequest } from '../../utils';
import { PATHS } from '../../constants';

export function getUserHobbyRoute(req: IncomingMessage, res: ServerResponse) {
    const userService = UserService.getInstance();
    const userId: number = getUserIdFromRequest(req, res, PATHS.userHobby);
    const userHobby = userService.getUserHobbies(userId);

    if (userHobby && userHobby.length) {
        res.setHeader('Cache-Control', 'public, max-age=2000')
        res.statusCode = 200;
        res.end(JSON.stringify(userHobby));
        return;
    } else {
        res.statusCode = 404;
        res.end('User not found')
    }
}