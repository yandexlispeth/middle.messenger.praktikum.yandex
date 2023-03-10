import Block from "../../components/Block";
import Avatar from "../../components/Avatar";
import Label from "../../components/Label";
import template from "./chatMessageItem.hbs";

interface IChatItemAvatar {
  class?: string;
}

interface IChatItemLabel {
  value: string;
  class?: string;
}

interface IChatMessageItemProps {
  avatar: IChatItemAvatar;
  labelChatName: IChatItemLabel;
  labelChatInfo: IChatItemLabel;
  labelChatTime: IChatItemLabel;
}

export class ChatMessageItem extends Block<IChatMessageItemProps> {
  init() {
    this.children.bigAvatar = new Avatar({
      class: "chat_item__avatar",
    });

    this.children.labelChatName = new Label({
      value: this.props.labelChatName.value,
      class: "chat-info-name",
    });

    this.children.labelChatInfo = new Label({
      value: this.props.labelChatInfo.value,
      class: "chat-info__message",
    });

    this.children.labelChatTime = new Label({
      value: this.props.labelChatTime.value,
      class: "chat-info-time",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
