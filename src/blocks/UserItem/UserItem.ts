import Block from "../../components/Block";
import Label from "../../components/Label";
import template from './userItem.hbs';

export interface IUserItem {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  events?: {
    click?: () => void;
  };
}

export class UserItem extends Block<IUserItem> {
  init() {
    this.children.lblFirstName = new Label({
      value: this.props.first_name,
    });

    this.children.lblSecondName = new Label({
      value: this.props.second_name,
    });

    this.children.lblDisplayName = new Label({
      value: this.props.display_name,
    });

    this.children.lblLogin = new Label({
      value: this.props.login,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
