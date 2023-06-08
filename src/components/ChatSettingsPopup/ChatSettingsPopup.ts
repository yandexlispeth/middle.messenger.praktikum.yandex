import template from "./chatsettingspopup.hbs";
import Link from "../Link";
import Block from "../Block";

interface IChatSettingsPopupProps {
  onDeleteClick?: () => void;
  onAddUser?: () => void;
  onDeleteUser?: () => void;
}

export class ChatSettingsPopup extends Block<IChatSettingsPopupProps> {
  init() {
    this.children.deleteChatLink = new Link({
      label: "Удалить чат",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.props.onDeleteClick?.();
        },
      },
    });

    this.children.addUser = new Link({
      label: "Добавить пользователя",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.props.onAddUser?.();
        },
      },
    });

    this.children.deleteUser = new Link({
      label: "Удалить пользователя из чата",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.props.onDeleteUser?.();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
