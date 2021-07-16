import { UserToken } from 'src/domain/user';
import { Options } from 'ky';

type RequestParams = {
    url: string;
    options?: Options;
    data?: Record<string, any>;
    jsonDecode?: boolean;
    body?: any;
};

type AuthRequestParams = {
    userToken: UserToken;
} & RequestParams;

export type Request<TResponse = any> = (
    params: RequestParams,
) => Promise<TResponse>;
export type AuthRequest<TResponse = any> = (
    params: AuthRequestParams,
) => Promise<TResponse>;

export type SuccessResponse = any;

export type FailureResponse = {
    message: string;
    documentation_url?: string;
};

export interface ApiResponse<T = SuccessResponse> {
    data: T;
}
