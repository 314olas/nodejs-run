import http from 'http';
import {PATHS, PORT} from './constants';
import { 
    updateUserByIdRoute, 
    createUserByIdRoute, 
    deleteUserByIdRoute, 
    getUserByIdRoute, 
    getAllUsersRoute, 
    getUserHobbyRoute, 
    deleteUserHobbyRoute, 
    addUserHobbyRoute
} from './endpoints/user';

const server = http.createServer((req, res) => {
    const url = new URL(req.url as string, `http://${req.headers.host}`);

    if (req.method === "GET") {        
        if (url.pathname === PATHS.allUsers) {
            getAllUsersRoute(req, res);
            return;
        }
        
        if (url.pathname.startsWith(PATHS.userId)) {
            getUserByIdRoute(req, res);
            return;
        }

        if (url.pathname.startsWith(PATHS.userHobby)) {
            getUserHobbyRoute(req, res);
            return;
        }
    }

    if (req.method === 'DELETE') {
        if (url.pathname.startsWith(PATHS.userId)) {
            deleteUserByIdRoute(req, res)
            return;
        }

        if (url.pathname.startsWith(PATHS.userHobby)) {
            deleteUserHobbyRoute(req, res)
            return;
        }
    }

    if (req.method === 'POST') {
        if (url.pathname === PATHS.allUsers ) {
            createUserByIdRoute(req, res)
            return;
        }
    }

    if (req.method === 'PATCH') {
        if (url.pathname.startsWith(PATHS.userId)) {
            updateUserByIdRoute(req, res)
            return;
        }

        if (url.pathname.startsWith(PATHS.userHobby)) {
            addUserHobbyRoute(req, res)
            return;
        }
    }

    res.statusCode = 404;
    res.end('Something went wring')
    
})

server.listen(PORT, () => {
    console.log('Server is running!!!');
})