import { IUser } from "../../api/AuthApi";
import UserItem from "../../blocks/UserItem";
import { withStore } from "../../utils/Store";
import Block from "../Block";
import template from "./usersList.hbs";

interface IUserList {
  users: IUser[];
  onUserItemClick: (user_id: number) => void;
}

class UsersListBase extends Block<IUserList> {
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
              this.props.onUserItemClick(data.id);
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
