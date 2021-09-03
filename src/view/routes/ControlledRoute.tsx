/* @flow */
import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Spinner } from '../components/loading/Spinner';
import { useAuth } from '../hooks/useAuth';

interface Props extends RouteProps {
    redirectUrl?: string;
}

export const PrivateRoute: FC<Props> = ({
    children,
    redirectUrl = '/login',
    ...props
}) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner loading={isLoading} />;
    }

    return (
        <Route {...props}>
            {isAuthenticated ? children : <Redirect to={redirectUrl} />}
        </Route>
    );
};

export const PublicOnlyRoute: FC<Props> = ({
    children,
    redirectUrl = '/chat',
    ...props
}) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner loading={isLoading} />;
    }

    return (
        <Route {...props}>
            {!isAuthenticated ? children : <Redirect to={redirectUrl} />}
        </Route>
    );
};
