import UserApi, {IUserChangePassword} from "../api/UserApi";
import {IUser} from "../api/AuthApi";
import store from "../utils/Store";
import Store from "../utils/Store";


class UserController {
    private api: UserApi;

    constructor() {
        this.api = new UserApi();
    }

    async change_profile(data: IUser) {
        try {
            const new_profile = await this.api.change_profile(data);
            store.set("user.data", new_profile);
            alert('Данные успешно изменены');
        } catch (e) {
            console.log("Ошибка", e);
        }
    }

    async change_password(data: IUserChangePassword) {
        try {
            await this.api.change_password(data);
            alert('Пароль успешно изменён!')
        } catch (e) {
            alert('Не получилось :(')
            console.log(e);
        }
    }

    async update_avatar(file: FormData) {
        try {
            await this.api.update_avatar(file)
                .then((response) => {
                    Store.set('user.data', response);
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserController();
