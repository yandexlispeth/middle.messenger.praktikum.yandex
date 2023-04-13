import Form from "../../components/Form";
import Navigation from "../../blocks/Navigation";
import Block from "../../components/Block";
import template from "./authorization.hbs";
import AuthController from "../../controllers/AuthController";
import router from "../../utils/router";
import {Routes} from "../../index";
import {ISignInData} from "../../api/AuthApi";


export default class AuthorizationPage extends Block {
    init() {
        this.children.formAuth = new Form({
            fields: [
                {
                    input: {
                        type: "text",
                        name: "login",
                        placeholder: "Логин",
                    },
                },
                {
                    input: {
                        type: "password",
                        name: "password",
                        placeholder: "Пароль",
                    },
                },
            ],
            buttons: {
                label: "Авторизоваться",
                events: {
                    click: (e) => {
                        e.preventDefault();
                        this.onSubmit()
                    }
                }
            },
            class: "auth-form",
        });

        this.children.navigation = new Navigation({
            link1: {
                value: "Вход",
                events: {
                    click: () => router.go(Routes.Index)
                }
            },
            link2: {
                value: "Регистрация",
                events: {
                    click: () => router.go(Routes.Register)
                }
            },
        });
    }

    onSubmit() {
        const data = (this.children.formAuth as Form).getValues();
        AuthController.signin(data as ISignInData);
    }

    render() {
        return this.compile(template, this.props);
    }
}
