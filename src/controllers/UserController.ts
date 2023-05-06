import UserApi, {IUserChangePassword} from "../api/UserApi";
import {IUser} from "../api/AuthApi";
import store from "../utils/Store";


class UserController {
    private api: UserApi;

    constructor() {
        this.api = new UserApi();
    }

    async change_profile(data:IUser) {
        const new_profile = await this.api.change_profile(data);
        try {
            store.set("user.data", new_profile);
        }
        catch (e) {
            console.log("Ошибка", e);
        }
    }

    async change_password(data:IUserChangePassword) {
        try {
            await this.api.change_password(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    async update_avatar(file:FormData) {
        try {
            await this.api.update_avatar(file);
        }
        catch(e) {
            console.log(e);
        }
    }
}

export default new UserController();