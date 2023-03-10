import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ExtractPropertyFromArrayIfExist, InferPropertyType, Override, SerializableObject, SingleElement, StrictPartial, WithRequired } from './types';
import type { PickKeys } from 'ts-essentials';
export interface MethodsMap {
    POST: {
        body: true;
    };
    PUT: {
        body: true;
    };
    PATCH: {
        body: true;
    };
    DELETE: {
        body: false;
    };
    GET: {
        body: false;
    };
    OPTIONS: {
        body: false;
    };
}
export interface WithoutBodyApiEndpoint {
    params: SerializableObject;
    response: SerializableObject;
}
export interface WithBodyAPIEndpoint extends WithoutBodyApiEndpoint {
    body: SerializableObject;
}
export type Methods = PickKeys<MethodsMap, unknown>;
export type MethodsWithBody = PickKeys<MethodsMap, {
    body: true;
}>;
export type MethodsWithoutBody = PickKeys<MethodsMap, {
    body: false;
}>;
export type APIEndpointType = {
    URL: string;
} & {
    [key in MethodsWithBody]: WithBodyAPIEndpoint;
} & {
    [key in MethodsWithoutBody]: WithoutBodyApiEndpoint;
};
export type ApiEndpointsMapper<T extends WithRequired<StrictPartial<SingleElement<T>, APIEndpointType>, "URL">[], method extends Methods | "URL" = "URL"> = {
    [K in ExtractPropertyFromArrayIfExist<T, "URL", method>]: Extract<T[number], {
        URL: K;
    }>;
};
export type ReqType<T extends StrictPartial<T, APIEndpointType>, RequestType, M extends keyof T> = Override<RequestType, {
    method: M;
    body: M extends MethodsWithBody ? InferPropertyType<T[M], "body"> : never;
    query: M extends Methods ? InferPropertyType<T[M], "params"> : never;
}>;
export declare function createAPI<ReqTypeBase, ResType, NextType = unknown>(): <T extends StrictPartial<T, APIEndpointType>>(callback: (req: ReqType<T, ReqTypeBase, "POST" extends infer T_1 ? T_1 extends "POST" ? T_1 extends keyof T ? T_1 : never : never : never> | ReqType<T, ReqTypeBase, "PUT" extends infer T_2 ? T_2 extends "PUT" ? T_2 extends keyof T ? T_2 : never : never : never> | ReqType<T, ReqTypeBase, "PATCH" extends infer T_3 ? T_3 extends "PATCH" ? T_3 extends keyof T ? T_3 : never : never : never> | ReqType<T, ReqTypeBase, "DELETE" extends infer T_4 ? T_4 extends "DELETE" ? T_4 extends keyof T ? T_4 : never : never : never> | ReqType<T, ReqTypeBase, "GET" extends infer T_5 ? T_5 extends "GET" ? T_5 extends keyof T ? T_5 : never : never : never> | ReqType<T, ReqTypeBase, "OPTIONS" extends infer T_6 ? T_6 extends "OPTIONS" ? T_6 extends keyof T ? T_6 : never : never : never>, res: ResType, next?: NextType) => void) => (req: ReqType<T, ReqTypeBase, "POST" extends infer T_1 ? T_1 extends "POST" ? T_1 extends keyof T ? T_1 : never : never : never> | ReqType<T, ReqTypeBase, "PUT" extends infer T_2 ? T_2 extends "PUT" ? T_2 extends keyof T ? T_2 : never : never : never> | ReqType<T, ReqTypeBase, "PATCH" extends infer T_3 ? T_3 extends "PATCH" ? T_3 extends keyof T ? T_3 : never : never : never> | ReqType<T, ReqTypeBase, "DELETE" extends infer T_4 ? T_4 extends "DELETE" ? T_4 extends keyof T ? T_4 : never : never : never> | ReqType<T, ReqTypeBase, "GET" extends infer T_5 ? T_5 extends "GET" ? T_5 extends keyof T ? T_5 : never : never : never> | ReqType<T, ReqTypeBase, "OPTIONS" extends infer T_6 ? T_6 extends "OPTIONS" ? T_6 extends keyof T ? T_6 : never : never : never>, res: ResType, next?: NextType) => void;
export declare function AxiosExtended<API extends WithRequired<StrictPartial<SingleElement<API>, APIEndpointType>, "URL">[] = []>(config?: AxiosRequestConfig): SingleElement<API> extends APIEndpointType ? AxiosInstance : Override<AxiosInstance, {
    post: <Url extends ExtractPropertyFromArrayIfExist<API, "URL", "POST", never>, Request_1 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url], "POST", never>>(url: Url, body: InferPropertyType<Request_1, "body", never>, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_1, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_1, "response", unknown>, any>>;
    put: <Url_1 extends ExtractPropertyFromArrayIfExist<API, "URL", "PUT", never>, Request_2 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url_1], "PUT", never>>(url: Url_1, body: InferPropertyType<Request_2, "body", never>, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_2, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_2, "response", unknown>, any>>;
    patch: <Url_2 extends ExtractPropertyFromArrayIfExist<API, "URL", "PATCH", never>, Request_3 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url_2], "PATCH", never>>(url: Url_2, body: InferPropertyType<Request_3, "body", never>, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_3, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_3, "response", unknown>, any>>;
    get: <Url_3 extends ExtractPropertyFromArrayIfExist<API, "URL", "GET", never>, Request_4 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url_3], "GET", never>>(url: Url_3, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_4, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_4, "response", unknown>, any>>;
    options: <Url_4 extends ExtractPropertyFromArrayIfExist<API, "URL", "OPTIONS", never>, Request_5 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url_4], "OPTIONS", never>>(url: Url_4, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_5, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_5, "response", unknown>, any>>;
    delete: <Url_5 extends ExtractPropertyFromArrayIfExist<API, "URL", "DELETE", never>, Request_6 extends InferPropertyType<ApiEndpointsMapper<API, "URL">[Url_5], "DELETE", never>>(url: Url_5, config?: Override<AxiosRequestConfig<any>, {
        params: InferPropertyType<Request_6, "params", never>;
    }>) => Promise<AxiosResponse<InferPropertyType<Request_6, "response", unknown>, any>>;
}>;
export default AxiosExtended;
