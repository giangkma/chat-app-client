import * as awilix from 'awilix';

import makeApiService, { ApiService } from 'src/infra/api/ApiService';
import { AuthService } from './infra/auth/authService';
import { UserService } from './infra/user/userService';
import { ChatService } from './infra/chat/chatService';

export interface Cradle {
    apiService: ApiService;
    authService: AuthService;
    userService: UserService;
    chatService: ChatService;
}

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer<Cradle>();

/* ------------- Infra ------------- */
container
    // services
    .register({
        apiService: awilix.asFunction(makeApiService).singleton(),
        authService: awilix.asClass(AuthService).singleton(),
        userService: awilix.asClass(UserService).singleton(),
        chatService: awilix.asClass(ChatService).singleton(),
    })
    // repositories
    .register({
        // consumerRepository: awilix.asClass(ConsumerRepository).singleton(),
    });

/* ------------- App ------------- */
container
    // commit
    .register({});

export default container;
