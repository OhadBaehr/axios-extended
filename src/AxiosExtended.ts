


import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { ExtractPropertyFromArrayIfExist, InferPropertyType, Override, SerializableObject, SingleElement, StrictPartial, WithRequired } from './types'
import type { PickKeys } from 'ts-essentials';


export interface MethodsMap {
    POST: { body: true },
    PUT: { body: true },
    PATCH: { body: true },
    DELETE: { body: false },
    GET: { body: false },
    OPTIONS: { body: false }
}

export interface WithoutBodyApiEndpoint {
    params: SerializableObject;
    response: SerializableObject;
}

export interface WithBodyAPIEndpoint extends WithoutBodyApiEndpoint {
    body: SerializableObject;
}



export type Methods = PickKeys<MethodsMap, unknown>

export type MethodsWithBody = PickKeys<MethodsMap, { body: true }>
export type MethodsWithoutBody = PickKeys<MethodsMap, { body: false }>


export type APIEndpointType = { URL: string } & { [key in MethodsWithBody]: WithBodyAPIEndpoint } & { [key in MethodsWithoutBody]: WithoutBodyApiEndpoint }


export type ApiEndpointsMapper<T extends WithRequired<StrictPartial<SingleElement<T>, APIEndpointType>, "URL">[], method extends Methods | "URL" = "URL"> = {
    [K in ExtractPropertyFromArrayIfExist<T, "URL", method>]: Extract<T[number], { URL: K }>
};

export type ReqType<T extends StrictPartial<T, APIEndpointType>, RequestType, M extends keyof T> = Override<RequestType, {
    method: M;
    body: M extends MethodsWithBody ? InferPropertyType<T[M], "body"> : never
    query: M extends Methods ? InferPropertyType<T[M], "params"> : never
}>

export function createAPI<ReqTypeBase, ResType, NextType=unknown>() {
    type ReqTypeGenerate<T extends StrictPartial<T, APIEndpointType>, K extends string> = ReqType<T, ReqTypeBase, K extends keyof T ? K : never>
    return function <T extends StrictPartial<T, APIEndpointType>>(callback: (
        req: (
            ReqTypeGenerate<T, "POST"> |
            ReqTypeGenerate<T, "PUT"> |
            ReqTypeGenerate<T, "PATCH"> |
            ReqTypeGenerate<T, "DELETE"> |
            ReqTypeGenerate<T, "GET"> |
            ReqTypeGenerate<T, "OPTIONS">
        ),
        res: ResType,
        next?: NextType
    ) => void) {
        return callback
    }
}

export function AxiosExtended<API extends WithRequired<StrictPartial<SingleElement<API>, APIEndpointType>, "URL">[] = []>(config?: AxiosRequestConfig) {
    const axiosInstance = axios.create(config)
    type MappedAPI = ApiEndpointsMapper<API>

    type HTTPMethodWithBody<T extends string> = <Url extends ExtractPropertyFromArrayIfExist<API, "URL", T>, Request extends InferPropertyType<MappedAPI[Url], T>>(url: Url, body: InferPropertyType<Request, "body">, config?: Override<AxiosRequestConfig, {
        params: InferPropertyType<Request, "params">
    }>) => Promise<AxiosResponse<InferPropertyType<Request, "response", unknown>>>

    type HTTPMethodWithoutBody<T extends string> = <Url extends ExtractPropertyFromArrayIfExist<API, "URL", T>, Request extends InferPropertyType<MappedAPI[Url], T>>(url: Url, config?: Override<AxiosRequestConfig, {
        params: InferPropertyType<Request, "params">
    }>) => Promise<AxiosResponse<InferPropertyType<Request, "response", unknown>>>

    return axiosInstance as (SingleElement<API> extends APIEndpointType ? AxiosInstance : Override<AxiosInstance, {
        post: HTTPMethodWithBody<"POST">
        put: HTTPMethodWithBody<"PUT">
        patch: HTTPMethodWithBody<"PATCH">

        get: HTTPMethodWithoutBody<"GET">
        options: HTTPMethodWithoutBody<"OPTIONS">
        delete: HTTPMethodWithoutBody<"DELETE">
    }>)
}


export default AxiosExtended
