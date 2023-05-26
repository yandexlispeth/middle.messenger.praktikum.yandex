import Form from "../../components/Form";
import Navigation from "../../blocks/Navigation";
import Block from "../../components/Block";
import template from "./registration.hbs";
import AuthController from "../../controllers/AuthController";
import {ISignUpData} from "../../api/AuthApi";

export default class RegistrationPage extends Block {
    init() {
        this.children.formRegister = new Form({
            fields: [
                {
                    input: {
                        type: "text",
                        name: "email",
                        placeholder: "Почта",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "login",
                        placeholder: "Логин",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "first_name",
                        placeholder: "Имя",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "second_name",
                        placeholder: "Фамилия",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "phone",
                        placeholder: "Телефон",
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
            button: {
                label: "Зарегистрироваться",
                events: {
                    click: (e) => {
                        e.preventDefault();
                        this.onSubmit();
                    }
                }
            },
            class: "register-form",
        });

        this.children.navigation = new Navigation({});
    }

    render() {
        return this.compile(template, this.props);
    }

    onSubmit() {
        const data = (this.children.formRegister as Form).getValues();
        AuthController.signup(data as ISignUpData);
    }
}
