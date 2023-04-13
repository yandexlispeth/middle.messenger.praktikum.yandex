import AuthApi, { ISignInData, ISignUpData } from "../api/AuthApi";
import store from "../utils/Store";
import router from "../utils/router";
import {Routes} from "../index";

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: ISignUpData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Messenger);
    } catch (e) {
      console.log(e);
    }
  }

  async signin(data: ISignInData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      router.go(Routes.Messenger);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      store.set("user", undefined);
    } catch (e) {
      console.log(e);
    }
  }

  async fetchUser() {
    try {
      store.set("user.isLoading", true);
      const user = await this.api.getUser()
          .then((response) => {
            store.set("data", response);
          })
          .catch((e) => {
            console.log(e);
          })
      store.set("user", user);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
