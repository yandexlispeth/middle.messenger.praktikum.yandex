import { IUser } from "../../api/AuthApi";
import Block from "../Block";
import UsersList from "../UsersList";
import template from "./deleteUserPopup.hbs";

interface IDeleteUserPopup {
  users?: IUser[] | undefined;
  onUserItemClick: (user_id: number) => void;
}

export default class DeleteUserPopup extends Block<IDeleteUserPopup> {
  init() {
    this.children.userList = new UsersList({
      onUserItemClick: (user_id: number) => this.props.onUserItemClick(user_id),
    });
  }
  protected componentDidUpdate(
    oldProps: IDeleteUserPopup,
    newProps: IDeleteUserPopup
  ): boolean {
    if (newProps.users !== oldProps.users) {
      (this.children.userList as Block).setProps({ users: newProps.users });
    }
    return true;
  }

  render() {
    return this.compile(template, {});
  }
}
