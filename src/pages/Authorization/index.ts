import Form from "../../components/Form";
import Navigation from "../../blocks/Navigation";
import Block from "../../utils/Block";
import template from "./authorization.hbs";

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
      link1: "/",
      link2: "///",
      menu_title1: "Вход",
      menu_title2: "Регистрация",
      events: {
        click: () => console.log("navigation"),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
