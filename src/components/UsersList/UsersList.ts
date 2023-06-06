import { IUser } from "../../api/AuthApi";
import UserItem from "../../blocks/UserItem";
import { withStore } from "../../utils/Store";
import Block from "../Block";
import template from "./usersList.hbs";

interface IUserList {
  users: IUser[];
}

class UsersListBase extends Block<IUserList> {
  init() {
    // this.children.usersList = this.createUserList(this.props.users)!;
  }

  render() {
    return this.compile(template, {});
  }

  protected componentDidUpdate(
    oldProps: IUserList,
    newProps: IUserList
  ): boolean {
    if (oldProps !== newProps) {
      this.setProps({ users: newProps.users });
      this.children.usersList = this.createUserList(this.props.users)!;
    }
    return true;
  }

  private createUserList(users: IUser[]) {
    if (Array.isArray(users)) {
      return users.map((data: IUser) => {
        return new UserItem({
          ...data,
          events: {
            click: () => {
              console.log(`Click on ${data.id}`);
            },
          },
        });
      });
    }
  }
}

export const UsersList = withStore((state) => {
  return {
    users: state.foundUsers || [],
  };
})(UsersListBase as typeof Block);
