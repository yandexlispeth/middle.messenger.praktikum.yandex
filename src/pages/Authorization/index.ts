import { Form } from "../../components/Form/Form";
import Navigation from "../../components/Navigation";
import Block from "../../utils/Block";
import template from "./authorization.hbs";


export class AuthorizationPage extends Block {
    init() {
        this.children.formAuth = new Form({
            fields: [
                {
                type: "text",
                name:"login",
                placeholder: "Логин"
            },
            {
                type: "password",
                name: "password",
                placeholder: "Пароль"
            }
            ],
            buttons: {
                label: "Вход"
            },
            class: "input-fields__container"
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
