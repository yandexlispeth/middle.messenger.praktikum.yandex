import BaseAPI from "./BaseApi";
import {IUser} from "./AuthApi";

export default class ResourcesApi extends BaseAPI {
    constructor() {
        super("/");
    }

    get_resources(path: string): Promise<IUser> {
        const encoded = encodeURIComponent(path);
        return this.http.get(`/resources/${encoded}`);
    }


    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}