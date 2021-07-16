import { ChangePassword, UpdateProfile, User } from 'src/domain/user';
import { ApiService } from '../api/ApiService';
import { AuthService } from '../auth/authService';

interface Dependencies {
    apiService: ApiService;
    authService: AuthService;
}

export class UserService {
    private apiService: ApiService;
    private authService: AuthService;

    constructor({ apiService, authService }: Dependencies) {
        this.apiService = apiService;
        this.authService = authService;
    }

    async uploadAvatar(file: File): Promise<any> {
        const formdata = new FormData();
        formdata.append('file', file);

        const res = await this.apiService.post({
            url: 'image/upload',
            body: formdata,
        });

        return res.json();
    }

    async getProfile(): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: 'auth/get-profile',
            userToken: { authToken: token },
        });

        return res;
    }

    async updateProfile(data: UpdateProfile): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPut({
            url: 'auth/update-profile',
            data,
            userToken: { authToken: token },
        });

        return res.json();
    }

    async changePassword(data: ChangePassword): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPut({
            url: 'auth/change-password',
            data: {
                password: data.password,
                newPassword: data.newPassword,
            },
            userToken: { authToken: token },
        });

        return res.json();
    }
}
