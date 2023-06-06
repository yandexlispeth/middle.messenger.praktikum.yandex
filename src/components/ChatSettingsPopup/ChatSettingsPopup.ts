import template from "./chatsettingspopup.hbs";
import Link from "../Link";
import Block from "../Block";

interface IChatSettingsPopupProps {
  onDeleteClick?: () => void;
  onAddUser?: () => void;
}

export class ChatSettingsPopup extends Block<IChatSettingsPopupProps> {
  init() {
    this.children.deleteChatLink = new Link({
      label: "Удалить чат",
      events: {
        click: () => this.props.onDeleteClick?.(),
      },
    });

    this.children.addUser = new Link({
      label: "Добавить пользователя",
      events: {
        click: () => this.props.onAddUser?.(),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
