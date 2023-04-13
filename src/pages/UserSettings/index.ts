import Form from "../../components/Form";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Block from "../../components/Block";
import template from "./user_settings.hbs";
import Button from "../../components/Button";
import Router from "../../utils/router";
import { Routes } from "../..";
import {withStore} from "../../utils/Store";

class UserSettingsPageBase extends Block {
  init() {
    this.children.btnBack = new Button({
      class: "user-settings__btnback"
    });
    this.children.profileInfoBlock = new ProfileInfoBlock({
      labelUserName: { value: "Алина" },
      labelEmail: { value: "alinamalina@gmail.com" },
      button: {
        label: "Изменить пароль",
        events: { 
          click: () => Router.go(Routes.Password) },
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
        events: {
          click: () => console.log("blabla")
        }
      },
      class: "user_settings_form",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserSettingsPage = withStore((state) => {
  return state.user?.data || {};
})(UserSettingsPageBase as typeof Block)
