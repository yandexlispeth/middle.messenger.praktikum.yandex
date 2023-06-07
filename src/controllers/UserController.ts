import UserApi, { IUserChangePassword } from "../api/UserApi";
import { IUser } from "../api/AuthApi";
import store from "../utils/Store";

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async change_profile(data: IUser) {
    try {
      const new_profile = await this.api.change_profile(data);
      store.set("user.data", new_profile);
      alert("Данные успешно изменены");
    } catch (e) {
      console.log("Ошибка", e);
    }
  }

  async change_password(data: IUserChangePassword) {
    try {
      await this.api.change_password(data);
      alert("Пароль успешно изменён!");
    } catch (e) {
      alert("Не получилось :(");
      console.log(e);
    }
  }

  async update_avatar(file: FormData) {
    try {
      await this.api.update_avatar(file).then((response) => {
        store.set("user.data.avatar", response.avatar);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async search_user(login: string) {
    try {
      return await this.api.search_user(login).then((response) => {
        store.set("foundUsers", response);
        return response;
      });
    } catch (e) {
      console.log("Error", e);
    }
  }
}

export default new UserController();
