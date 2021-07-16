import { Request, AuthRequest, FailureResponse } from './interfaces';
import ky, { Options } from 'ky';

import { API_CONFIG } from 'src/config';
import { isFailedRequest, withUserToken } from './utilities';

export interface ApiService {
    post: Request;
    get: Request;
    del: Request;
    put: Request;
    patch: Request;
    authGet: AuthRequest;
    authPost: AuthRequest;
    authDel: AuthRequest;
    authPut: AuthRequest;
    authPatch: AuthRequest;
    isFailureResponse: (arg: any) => arg is FailureResponse;
}

const PREFIX_URL = `${API_CONFIG.HOST}/${API_CONFIG.API_PATH}`;

// Api service factory
export default (): ApiService => {
    const apiConfig: Options = {
        prefixUrl: PREFIX_URL,
        timeout: API_CONFIG.timeout,
        throwHttpErrors: false,
        retry: 0,
        hooks: {
            beforeRequest: [
                (request): void => {
                    console.log('[DEV] API REQUEST', { request });
                },
            ],
            afterResponse: [
                (_request, _options, response): void => {
                    console.log('[DEV] API RESPONSE', {
                        response,
                        link: response.headers.get('Link'),
                    });
                },
            ],
        },
    };

    const api = ky.extend(apiConfig);

    const post: Request = async ({ url, data, options, body }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }
        if (body) {
            options = {
                ...options,
                body,
            };
        }
        const res = await api.post(url, options);

        const isFailed = await isFailedRequest(res);

        if (isFailed) {
            const { message, error } = await res.json();
            throw new Error(message ?? error);
        }

        return res;
    };
    const get: Request = async ({ url, data, options, jsonDecode = true }) => {
        // https://github.com/sindresorhus/ky#searchparams
        if (data) {
            options = {
                ...options,
                searchParams: data,
            };
        }

        const res = await api.get(url, options);

        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
        }

        return jsonDecode ? res.json() : res;
    };
    const del: Request = async ({ url, data, options }) => {
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        const res = await api.delete(url, options);

        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
        }

        return res;
    };
    const put: Request = async ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        const res = await api.put(url, options);

        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
        }

        return res;
    };
    const patch: Request = async ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        const res = await api.patch(url, options);

        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
        }

        return res;
    };

    const authGet: AuthRequest = ({
        url,
        userToken,
        data,
        options = {},
        jsonDecode,
    }) =>
        get({
            url,
            data,
            options: withUserToken(options, userToken),
            jsonDecode,
        });

    const authPost: AuthRequest = ({
        url,
        userToken,
        data,
        body,
        options = {},
    }) => post({ url, data, body, options: withUserToken(options, userToken) });

    const authDel: AuthRequest = ({ url, userToken, data, options = {} }) =>
        del({ url, data, options: withUserToken(options, userToken) });

    const authPut: AuthRequest = ({ url, userToken, data, options = {} }) =>
        put({ url, data, options: withUserToken(options, userToken) });

    const authPatch: AuthRequest = ({ url, userToken, data, options = {} }) =>
        patch({ url, data, options: withUserToken(options, userToken) });

    /**
     * API Failure Response type guard
     *
     * @param {*} arg any
     * @returns {arg is FailureResponse}
     */
    const isFailureResponse = (arg: any): arg is FailureResponse => {
        return arg.message !== undefined;
    };

    return {
        post,
        get,
        del,
        put,
        patch,
        authGet,
        authPost,
        authDel,
        authPut,
        authPatch,
        isFailureResponse,
    };
};
