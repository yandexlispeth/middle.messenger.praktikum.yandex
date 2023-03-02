import Form from "../../components/Form";
import { ProfileInfoBlock } from "../../components/ProfileInfoBlock/ProfileInfoBlock";
import Block from "../../utils/Block";
import { renderDOM } from "../../utils/renderDOM";
import template from "./user_settings.hbs";

export class UserSettingsPage extends Block {
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
          type: "text",
          name: "email",
          placeholder: "Почта",
        },
        {
          type: "text",
          name: "login",
          placeholder: "Логин",
        },
        {
          type: "text",
          name: "display_name",
          placeholder: "Ник",
        },
        {
          type: "text",
          name: "phone",
          placeholder: "Телефон",
        },
        {
          type: "text",
          name: "first_name",
          placeholder: "Имя",
        },
        {
          type: "text",
          name: "second_name",
          placeholder: "Фамилия",
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
