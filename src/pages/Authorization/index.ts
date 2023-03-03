import Form from "../../components/Form";
import Navigation from "../../blocks/Navigation";
import Block from "../../components/Block";
import template from "./authorization.hbs";
import { renderDOM, ROUTES } from "../../utils/renderDOM";

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
      },
      class: "auth-form",
    });

    this.children.navigation = new Navigation({
      link1: {
        value: "Вход",
        events: {
          click: () => renderDOM("authorization")
        }
      },
      link2: {
        value: "Регистрация",
        events: {
          click: () => renderDOM("registration")
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
