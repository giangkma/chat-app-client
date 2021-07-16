import React, { FC } from 'react';
import { AuthProvider } from './hooks/useAuth';
import Router from './routes/Router';

const Application: FC = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
};

export default Application;
