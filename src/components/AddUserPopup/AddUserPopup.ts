import Popup from "../Popup";
import Input from "../Input";
import Button from "../Button";
import template from "./addUserPopup.hbs";
import store from "../../utils/Store";
import UserController from "../../controllers/UserController";
import { IUser } from "../../api/AuthApi";
import UsersList from "../UsersList";

export class AddUserPopup extends Popup {
  init(): void {
    this.children.inputUserLogin = new Input({
      type: "text",
      name: "login",
      placeholder: "Введите логин пользователя",
    });

    this.children.btnAddUser = new Button({
      label: "Поиск пользователя",
      events: {
        click: () => {
          this.getUsers();
          (this.children.inputUserLogin as Input).setValue("");
          store.set("modals.chat_add_user", false);
        },
      },
    });

    this.children.btnCancel = new Button({
      label: "Отмена",
      events: {
        click: () => {
          (this.element as HTMLElement).remove();
          store.set("foundUsers", []);
        }
      },
    });

    this.children.userList = new UsersList({});
  }

  async getUsers(): Promise<IUser[] | undefined> {
    return await UserController.search_user(
      (this.children.inputUserLogin as Input).getValue()
    );
  }

  render() {
    return this.compile(template, {});
  }
}
