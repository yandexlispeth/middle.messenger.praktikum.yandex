import Form from "../../components/Form";
import Block from "../../components/Block";
import template from "./user_change_password.hbs";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import UserController from "../../controllers/UserController";
import { IUserChangePassword } from "../../api/UserApi";
import Link from "../../components/Link";
import store from "../../utils/Store";
import Router from "../../utils/Router";

export default class UserChangePasswordPage extends Block {
  init() {
    this.children.btnBack = new Link({
      label: "Назад",
      events: {
        click: () => Router.back(),
      },
    });
    this.children.profileInfoBlock = new ProfileInfoBlock({
      avatar: store.getState().user?.data?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${
            store.getState().user?.data?.avatar
          }`
        : "../../../static/person.png",
      userName: store.getState().user?.data?.first_name,
      userEmail: store.getState().user?.data?.email,
    });
    this.children.formUserChangePassword = new Form({
      fields: [
        {
          input: {
            type: "password",
            name: "oldPassword",
            placeholder: "Старый пароль",
          },
        },
        {
          input: {
            type: "password",
            name: "newPassword",
            placeholder: "Новый пароль",
          },
        },
        {
          input: {
            type: "password",
            name: "newPasswordAgain",
            placeholder: "Новый пароль ещё раз",
          },
        },
      ],
      button: {
        label: "Сохранить изменения",
        events: {
          click: (e) => {
            e.preventDefault();
            this.saveForm();
          },
        },
      },
      class: "user-change_password__form",
    });
  }

  saveForm() {
    const data = (this.children.formUserChangePassword as Form).getValues();
    UserController.change_password(data as IUserChangePassword).then(() => {
      this.dispatchComponentDidMount();
      (this.children.formUserChangePassword as Form).reset();
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
