import { Form } from "../../components/Form/Form";
import Navigation from "../../components/Navigation";
import Block from "../../utils/Block";
import template from "./registration.hbs";


export class RegistrationPage extends Block {
    init() {
        this.children.formRegister = new Form({
            fields: [
                {
                type: "text",
                name:"email",
                placeholder: "Почта"
            },
            {
                type: "text",
                name: "login",
                placeholder: "Пароль"
            },
            {
                type: "text",
                name: "first_name",
                placeholder: "Имя"
            },
            {
                type: "text",
                name: "second_name",
                placeholder: "Фамилия"
            },
            {
                type:"text",
                name: "phone",
                placeholder: "Телефон"
            },
            {
                type:"password",
                name: "password",
                placeholder: "Пароль"
            }
            ],
            buttons: {
                label: "Зарегистрироваться"
            },
            class: "register-form"
        });


        this.children.navigation = new Navigation({
            link1: '/',
            link2:'///',
            menu_title1: 'Вход',
            menu_title2: 'Регистрация',
            events: {
                click: () => console.log("navigation")
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
