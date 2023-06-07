import AuthApi, {ISignInData, ISignUpData} from "../api/AuthApi";
import store from "../utils/Store";
import Router from "../utils/Router";
import {Routes} from "../index";
import router from "../utils/Router";
import MessagesController from "./MessagesController";

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
            MessagesController.closeAll();
            await this.api.logout();
            store.set("user", undefined);
            store.set("chats", undefined);
            store.set("messages", undefined);
            Router.go(Routes.Index);
        } catch (e) {
            console.log(e);
        }
    }

    async fetchUser() {
        const user = await this.api.getUser();
        try {
            store.set("user.data", user);
        } catch(e) {
            console.log("Ошибка!", e);
        }
    }
}

export default new AuthController();
