import Button from "../../components/Button";
import Form from "../../components/Form";
import Label from "../../components/Label";
import Block from "../../utils/Block";
import template from "./user_change_password.hbs";

export class UserChangePasswordPage extends Block {

  init() {
    this.children.labelUserName = new Label({ text: "Алина", className: "user-data__name" });
    this.children.labelEmail = new Label({ text: "alinamalina@gmail.com", className: "user-data__email"});
    this.children.btnChangeSettings = new Button({ label: "Изменить данные" });
    this.children.formUserChangePassword= new Form({
      fields: [
        {
          type: "password",
          name: "oldPassword",
          placeholder: "Старый пароль",
        },
        {
          type: "password",
          name: "newPassword",
          placeholder: "Новый пароль",
        },
        {
          type: "password",
          name: "newPasswordAgain",
          placeholder: "Новый пароль ещё раз",
        },
      ],
      buttons: {
        label: "Сохранить изменения",
      },
      class: "input-fields__container"
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
