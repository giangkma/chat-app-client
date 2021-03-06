/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useEffect, useState } from 'react';
import socket from 'src/config/SOCKET_CONFIG';
import container from 'src/container';
import { DataAuth, User } from 'src/domain/user';

interface AuthContext {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | undefined;
    setUser: (user: User) => void;
    onLogin: (data: DataAuth) => void;
    onRegister: (data: DataAuth) => void;
    onLogout: () => void;
}

const {
    cradle: { authService },
} = container;

export const AuthContext = React.createContext<AuthContext>({
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    setUser: () => {},
    onLogin: () => {},
    onRegister: () => {},
    onLogout: () => {},
});

export const useAuth = (): AuthContext => React.useContext(AuthContext);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

    const onLogin = async (data: DataAuth): Promise<void> => {
        const res = await authService.login(data);
        socket.emit('user-login', res.information._id);
        authService.saveToken(res.accessToken);
        setUser(res.information);
        authService.saveToken(res.accessToken);
        setIsAuthenticated(true);
        localStorage.setItem('username', res.information.username);
        localStorage.setItem('userId', res.information._id);
    };

    const onRegister = async (data: DataAuth): Promise<void> => {
        const res = await authService.register(data);
        socket.emit('user-login', res.information._id);
        authService.saveToken(res.accessToken);
        setUser(res.information);
        authService.saveToken(res.accessToken);
        setIsAuthenticated(true);
        localStorage.setItem('username', res.information.username);
        localStorage.setItem('userId', res.information._id);
    };

    const onLogout = (): void => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        authService.removeToken();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        (async (): Promise<void> => {
            const accessToken = await authService.getToken();
            if (accessToken) {
                const user = await authService.getUserProfile();
                setUser(user);
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
                setUser,
                onLogin,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
