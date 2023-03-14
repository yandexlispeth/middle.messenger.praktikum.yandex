import Form from "../../components/Form";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Block from "../../components/Block";
import { renderDOM } from "../../utils/renderDOM";
import template from "./user_settings.hbs";

export default class UserSettingsPage extends Block {
  init() {
    this.children.profileInfoBlock = new ProfileInfoBlock({
      labelUserName: { value: "Алина" },
      labelEmail: { value: "alinamalina@gmail.com" },
      button: {
        label: "Изменить пароль",
        events: { click: () => renderDOM("user_change_password") },
      },
    });

    this.children.formUserSettings = new Form({
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
            name: "display_name",
            placeholder: "Ник",
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
      ],
      buttons: {
        label: "Сохранить изменения",
      },
      class: "user_settings_form",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
