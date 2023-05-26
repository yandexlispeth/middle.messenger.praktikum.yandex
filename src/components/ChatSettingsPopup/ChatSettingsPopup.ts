import template from "./chatsettingspopup.hbs";
import Link from "../Link";
import Block from "../Block";

interface IChatSettingsPopupProps {
    onAddClick?: () => void;
    onDeleteClick?: () => void;
}

export class ChatSettingsPopup extends Block<IChatSettingsPopupProps> {
  init() {
    this.children.addChatLink = new Link({
      label: "Новый чат",
      events: {
        click: () => this.props.onAddClick?.()
      },
    });

    this.children.deleteChatLink = new Link({
      label: "Удалить чат",
      events: {
        click: () => this.props.onDeleteClick?.(),
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
