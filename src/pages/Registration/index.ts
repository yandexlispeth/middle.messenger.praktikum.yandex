import Form from "../../components/Form";
import Navigation from "../../blocks/Navigation";
import Block from "../../components/Block";
import template from "./registration.hbs";

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
      buttons: {
        label: "Зарегистрироваться",
      },
      class: "register-form",
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
