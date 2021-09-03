import { AuthToken, DataAuth, ResponseAuth, User } from 'src/domain/user';
import { TypedEvent } from 'src/helper/event';
import Cookies from 'universal-cookie';
import { ApiService } from '../api/ApiService';

interface Dependencies {
    apiService: ApiService;
}
const TOKEN_COOKIE_KEY = 'token';

export class AuthService {
    private apiService: ApiService;

    private onTokenChange = new TypedEvent<AuthToken | undefined>();

    private cookies = new Cookies();

    constructor({ apiService }: Dependencies) {
        this.apiService = apiService;
    }

    async login(data: DataAuth): Promise<ResponseAuth> {
        const res = await this.apiService.post({
            url: 'auth/login',
            data,
        });
        return res.json();
    }

    async register(data: DataAuth): Promise<ResponseAuth> {
        const res = await this.apiService.post({
            url: 'auth/register',
            data,
        });
        return res.json();
    }

    getUserProfile(): Promise<User> {
        const token = this.getToken();
        return this.apiService.authGet({
            url: 'auth/get-profile',
            userToken: { authToken: token },
        });
    }

    saveToken = (token: AuthToken): void => {
        // save token to browser cookies
        this.cookies.set(TOKEN_COOKIE_KEY, token, { path: '/' });

        // token listener cb execute
        this.onTokenChange.emit(token);
    };

    getToken = (): AuthToken => {
        // get token from browser cookies
        const token = this.cookies.get<AuthToken>(TOKEN_COOKIE_KEY);

        if (!token) return '';

        return token;
    };

    removeToken = (): void => {
        // get token from browser cookies
        this.cookies.remove(TOKEN_COOKIE_KEY);

        // token listener cb execute
        this.onTokenChange.emit(undefined);
    };
}
