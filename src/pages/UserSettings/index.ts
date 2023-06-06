import Form from "../../components/Form";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Block from "../../components/Block";
import template from "./user_settings.hbs";
import Button from "../../components/Button";
import Router from "../../utils/Router";
import { Routes } from "../..";
import store, { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import { IUser } from "../../api/AuthApi";
import Link from "../../components/Link";

interface IUserSettingsPageBase {
  avatar: string;
  first_name: string;
  email: string;
}

class UserSettingsPageBase extends Block<IUserSettingsPageBase> {
  init() {
    this.children.btnBack = new Link({
      label: "Назад",
      events: {
        click: () => Router.back(),
      },
      // class: "user-settings__btnback"
    });
    this.children.profileInfoBlock = new ProfileInfoBlock({
      avatar: `https://ya-praktikum.tech/api/v2/resources/${
        store.getState().user?.data?.avatar
      }`,
      userName: this.props.first_name,
      userEmail: this.props.email,
    });

    // this.children.popupAvatar = new Dialog({style: "display: none"});

    // this.children.linkPopupAvatar = new Link({
    //     label: 'Изменить аватар',
    //     events: {
    //         click: () => {
    //             (this.children.popupAvatar as Block).hide();
    //         }
    //     }
    // });

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
          UserController.update_avatar(form).then(() =>
            this.dispatchComponentDidMount()
          );
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
        avatar: newProps.avatar,
      });
    }

    return true;
  }

  saveForm() {
    const data = (this.children.formUserSettings as Form).getValues();
    UserController.change_profile(data as IUser).then(() => {
      this.dispatchComponentDidMount();
      (this.children.formUserSettings as Form).reset();
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserSettingsPage = withStore((state) => {
  return { ...state.user?.data } || {};
})(UserSettingsPageBase as typeof Block);
