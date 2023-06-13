import UserApi, { IUserChangePassword } from "../api/UserApi";
import { IUser } from "../api/AuthApi";
import store from "../utils/Store";

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async changeProfile(data: IUser) {
    try {
      const new_profile = await this.api.changeProfile(data);
      store.set("user.data", new_profile);
      alert("Данные успешно изменены");
    } catch (e) {
      console.log("Ошибка", e);
    }
  }

  async changePassword(data: IUserChangePassword) {
    try {
      await this.api.changePassword(data);
      alert("Пароль успешно изменён!");
    } catch (e) {
      alert("Не получилось :(");
      console.log(e);
    }
  }

  async updateAvatar(file: FormData) {
    try {
      await this.api.updateAvatar(file).then((response) => {
        store.set("user.data.avatar", response.avatar);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async searchUser(login: string) {
    try {
      return await this.api.searchUser(login).then((response) => {
        store.set("foundUsers", response);
        return response;
      });
    } catch (e) {
      console.log("Error", e);
    }
  }
}

export default new UserController();
