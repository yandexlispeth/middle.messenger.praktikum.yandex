import Form from "../../components/Form";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Block from "../../components/Block";
import template from "./user_settings.hbs";
import Button from "../../components/Button";
import Router from "../../utils/Router";
import { Routes } from "../..";
import { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import { IUser } from "../../api/AuthApi";
import Link from "../../components/Link";

interface IUserSettingsPageBase {
  avatar: string;
  first_name: string;
  second_name: string;
  login: string;
  display_name: string;
  phone: string;
  email: string;
}

class UserSettingsPageBase extends Block<IUserSettingsPageBase> {
  init() {
    this.children.btnBack = new Link({
      label: "Назад",
      events: {
        click: () => Router.back(),
      },
    });
    this.children.profileInfoBlock = new ProfileInfoBlock({
      avatar: this.props.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
        : "",
      userName: this.props.first_name,
      userEmail: this.props.email,
    });

    this.children.formAvatar = new Form({
      id: "formAvatar",
      fields: [
        {
          input: {
            type: "file",
            id: "avatar",
            name: "avatar",
          },
        },
      ],
      button: {
        label: "Отправить аватар",
        type: "submit",
      },
      events: {
        submit: (e) => {
          e.preventDefault();
          const formAvatar = document.getElementById("formAvatar");
          const form = new FormData(formAvatar as HTMLFormElement);
          UserController.updateAvatar(form);
        },
      },
    });

    this.children.btnChangePassword = new Button({
      label: "Изменить пароль",
      events: {
        click: () => Router.go(Routes.Password),
      },
    });

    this.children.btnLogout = new Button({
      label: "Выход из профиля",
      events: {
        click: () => AuthController.logout(),
      },
    });

    this.children.formUserSettings = new Form({
      fields: this.makeData(this.props),
      button: {
        label: "Сохранить изменения",
        events: {
          click: (e) => {
            e.preventDefault();
            this.saveForm();
          },
        },
      },
      class: "user_settings_form",
    });
  }

  componentDidUpdate(
    oldProps: IUserSettingsPageBase,
    newProps: IUserSettingsPageBase
  ) {
    if (oldProps.first_name !== newProps.first_name) {
      (this.children.profileInfoBlock as Block).setProps({
        userName: newProps.first_name,
      });
    }
    if (oldProps.email !== newProps.email) {
      (this.children.profileInfoBlock as Block).setProps({
        userEmail: newProps.email,
      });
    }

    if (oldProps.avatar !== newProps.avatar) {
      (this.children.profileInfoBlock as Block).setProps({
        avatar: `https://ya-praktikum.tech/api/v2/resources/${newProps.avatar}`,
      });
    }

    if (oldProps !== newProps) {
      (this.children.formUserSettings as Form).setProps({
        fields: this.makeData(newProps),
      });
    }

    return true;
  }

  saveForm() {
    const data = (this.children.formUserSettings as Form).getValues();
    if (!data) {
      return;
    }
    UserController.changeProfile(data as IUser).then(() => {
      (this.children.formUserSettings as Form).reset();
    });
  }

  makeData(props: IUserSettingsPageBase) {
    const data = [
      {
        input: {
          type: "text",
          name: "email",
          value: props.email,
          placeholder: "Почта",
        },
      },
      {
        input: {
          type: "text",
          name: "login",
          value: props.login,
          placeholder: "Логин",
        },
      },
      {
        input: {
          type: "text",
          name: "display_name",
          value: props.display_name,
          placeholder: "Ник",
        },
      },
      {
        input: {
          type: "text",
          name: "phone",
          value: props.phone,
          placeholder: "Телефон",
        },
      },
      {
        input: {
          type: "text",
          name: "first_name",
          value: props.first_name,
          placeholder: "Имя",
        },
      },
      {
        input: {
          type: "text",
          name: "second_name",
          value: props.second_name,
          placeholder: "Фамилия",
        },
      },
    ];

    return data;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserSettingsPage = withStore((state) => {
  return { ...state.user?.data } || {};
})(UserSettingsPageBase as typeof Block);
