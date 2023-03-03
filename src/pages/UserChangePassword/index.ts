import Form from "../../components/Form";
import Block from "../../components/Block";
import template from "./user_change_password.hbs";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import { renderDOM } from "../../utils/renderDOM";

export default class UserChangePasswordPage extends Block {
  init() {
    this.children.profileInfoBlock = new ProfileInfoBlock({
      labelUserName: { value: "Алина" },
      labelEmail: { value: "alinamalina@gmail.com" },
      button: {
        label: "Изменить данные",
        events: { click: () => renderDOM("user_settings") },
      },
    });
    this.children.formUserChangePassword = new Form({
      fields: [
        {
          input: {
            type: "password",
            name: "oldPassword",
            placeholder: "Старый пароль",
          }
          
        },
        {
          input: {
            type: "password",
            name: "newPassword",
            placeholder: "Новый пароль",
          }
        },
        {
          input: {
            type: "password",
            name: "newPasswordAgain",
            placeholder: "Новый пароль ещё раз",
          }
        },
      ],
      buttons: {
        label: "Сохранить изменения",
      },
      class: "user-change_password__form",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
