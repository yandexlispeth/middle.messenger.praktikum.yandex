import Form from "../../components/Form";
import Block from "../../components/Block";
import template from "./user_change_password.hbs";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Button from "../../components/Button";
import router from "../../utils/Router";
import UserController from "../../controllers/UserController";
import {IUserChangePassword} from "../../api/UserApi";

export default class UserChangePasswordPage extends Block {
  init() {
    this.children.btnBack = new Button({
      label: "Назад",
      events: {
        click: (() => router.back())
      },
      // class: "user-settings__btnback"
    });
    this.children.profileInfoBlock = new ProfileInfoBlock({
      userName: this.props.first_name,
      userEmail: this.props.email,
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
        events: {
          click: (e) => {
            e.preventDefault();
            this.saveForm();
          }
        }
      },
      class: "user-change_password__form",
    });
  }

  saveForm() {
    const data = (this.children.formUserChangePassword as Form).getValues();
    UserController.change_password(data as IUserChangePassword);
  }
  render() {
    return this.compile(template, this.props);
  }
}
