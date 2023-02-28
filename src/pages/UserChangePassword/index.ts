import Form from "../../components/Form";
import Block from "../../utils/Block";
import template from "./user_change_password.hbs";
import ProfileInfoBlock from "../../components/ProfileInfoBlock";

export class UserChangePasswordPage extends Block {

  init() {
    this.children.profileInfoBlock = new ProfileInfoBlock({
      labelUserName: { value: "Алина"},
      labelEmail: {value: "alinamalina@gmail.com"},
      button: {label: "Изменить данные"}
  });
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
