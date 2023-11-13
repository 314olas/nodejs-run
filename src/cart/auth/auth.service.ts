import { loginUser, registerUser } from './auth.repository';

export class AuthService {
    async login(creds: { email: string, password: string }) {
        return await loginUser(creds);
    }

    async register(userDTO: object) {
        return await registerUser(userDTO);
    }
}

export const authService =  new AuthService();
