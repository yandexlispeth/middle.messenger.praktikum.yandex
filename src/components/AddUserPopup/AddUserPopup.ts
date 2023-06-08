import Input from "../Input";
import Button from "../Button";
import template from "./addUserPopup.hbs";
import store from "../../utils/Store";
import UserController from "../../controllers/UserController";
import { IUser } from "../../api/AuthApi";
import UsersList from "../UsersList";
import Block from "../Block";

interface IAddUserPopup {
  onUserItemClick: (user_id: number) => void;
}

export class AddUserPopup extends Block<IAddUserPopup> {
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

    this.children.userList = new UsersList({
      onUserItemClick: (user_id:number) => {
        this.props.onUserItemClick(user_id);
        (this.children.inputUserLogin as Input).setValue('');
      }
    });
  }
  
  async getUsers(): Promise<IUser[] | undefined> {
    return await UserController.searchUser(
      (this.children.inputUserLogin as Input).getValue()
    );
  }

  render() {
    return this.compile(template, {});
  }
}
