import {IncomingMessage, ServerResponse} from 'http'
import { PATHS } from './constants';

export function getUserIdFromRequest(req: IncomingMessage, res: ServerResponse, pathNames: string): number {
    const url = new URL(req.url as string, `http://${req.headers.host}`);
    const userId: number = Number(url.pathname.replace(pathNames, ''));
    
    return userId
}

export function parsBodyRequest(req: IncomingMessage, res: ServerResponse, cb: Function) {
    let requestBody = '';

    req.on('data', (chunk) => {        
        requestBody += chunk.toString();
    });

    req.on('end', () => {
        
        if (requestBody) {
            cb(JSON.parse(requestBody))
        }

        res.statusCode = 204;
        res.end('')
    })
}