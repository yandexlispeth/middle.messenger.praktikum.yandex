export enum Method {
    Get = "Get",
    Post = "Post",
    Put = "Put",
    Patch = "Patch",
    Delete = "Delete",
}

type Options = {
    method: Method;
    data?: any;
    timeout?: number;
};

export default class HTTPTransport {
    static API_URL = "https://ya-praktikum.tech/api/v2";
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(path = "/"): Promise<Response> {
        return this.request<Response>(this.endpoint + path);
    }

    public post<Response = void>(
        path: string,
        data?: unknown
    ): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Post,
            data,
        });
    }

    public put<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Put,
            data,
        });
    }

    public delete<Response>(path: string, data: unknown): Promise<Response> {
        return this.request(this.endpoint + path, {
            method: Method.Delete,
            data
        });
    }

    private request<Response>(
        url: string,
        options: Options = {method: Method.Get}
    ): Promise<Response> {

        const {method, data, timeout} = options;

        const xhr = new XMLHttpRequest();
        if (timeout) {
            xhr.timeout = timeout;
        }

        return new Promise((resolve, reject) => {
            xhr.open(method, url);
            xhr.onreadystatechange = () => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }


            xhr.withCredentials = true;
            xhr.responseType = "json";

            if (method === Method.Get || !data) {
                xhr.send();
                return;
            } else if (data instanceof FormData) {
                xhr.send(data);
                return;
            }
            xhr.send(JSON.stringify(data));
        });
    }
}
