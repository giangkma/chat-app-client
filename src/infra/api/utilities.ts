import { Options } from 'ky';
import { UserToken } from 'src/domain/user';

/**
 * add user token to request header
 *
 * @param {Options} options - url Endpoint
 * @param {UserToken} userToken - user token string
 * @returns {Options}
 */
export const withUserToken = (
    options: Options,
    userToken?: UserToken,
): Options => {
    if (!userToken) {
        return options;
    }

    return {
        ...options,
        headers: {
            ...options.headers,
            authorization: `Bearer ${userToken.authToken}`,
        },
    };
};

export const isFailedRequest = async (res: Response): Promise<boolean> => {
    const { error } = await res.clone().json();
    return !res.ok || error;
};
