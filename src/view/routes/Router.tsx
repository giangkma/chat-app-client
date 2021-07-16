import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ChatScreen, LoginScreen, RegisterScreen } from 'src/view/screens';
import { PageShell } from '../components/pageShell';
import { PrivateRoute, PublicOnlyRoute } from './ControlledRoute';

export enum Screen {
    Login = '/login',
    Chat = '/chat',
    Register = '/resgister',
}

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicOnlyRoute path={Screen.Login}>
                    <PageShell>
                        <LoginScreen />
                    </PageShell>
                </PublicOnlyRoute>

                <PublicOnlyRoute path={Screen.Register}>
                    <PageShell>
                        <RegisterScreen />
                    </PageShell>
                </PublicOnlyRoute>

                <PrivateRoute path={`${Screen.Chat}/:chatId`}>
                    <PageShell>
                        <ChatScreen />
                    </PageShell>
                </PrivateRoute>

                <PrivateRoute path={Screen.Chat}>
                    <PageShell>
                        <ChatScreen />
                    </PageShell>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
