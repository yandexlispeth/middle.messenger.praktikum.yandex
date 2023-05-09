import BaseAPI from "./BaseApi";
import {IUser} from "./AuthApi";

export interface IUserChangePassword {
    oldPassword: string;
    newPassword: string;
}

export default class UserApi extends BaseAPI {
    constructor() {
        super("/user");
    }

    change_profile(data: IUser): Promise<IUser> {
        return this.http.put("/profile", data);
    }

    change_password(data: IUserChangePassword): Promise<boolean> {
        return this.http.put("/password", data);
    }

    update_avatar(file: FormData): Promise<IUser> {
        return this.http.put("/profile/avatar", file);
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}