import { SendMessagePayload } from 'src/domain/conversation';
import { ApiService } from '../api/ApiService';
import { AuthService } from '../auth/authService';

interface Dependencies {
    apiService: ApiService;
    authService: AuthService;
}

export class ChatService {
    private apiService: ApiService;
    private authService: AuthService;

    constructor({ apiService, authService }: Dependencies) {
        this.apiService = apiService;
        this.authService = authService;
    }

    async getConversationList(): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `conversation-list?id=${localStorage.userId}`,
            userToken: { authToken: token },
        });

        return res;
    }

    async getConversationDetail(id1: string, id2: string): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `conversation?id1=${id1}&id2=${id2}`,
            userToken: { authToken: token },
        });

        return res;
    }

    async getPeople(query: string): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `search?s=${query}`,
            userToken: { authToken: token },
        });

        return res;
    }

    async sendMessage(body: SendMessagePayload): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: `send-message`,
            data: body,
            userToken: { authToken: token },
        });

        return res.json();
    }

    async getMessage(id: string): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `get-messages?cid=${id}`,
            userToken: { authToken: token },
        });

        return res;
    }
}
