import Block from "../../components/Block";
import Avatar from "../../components/Avatar";
import Label from "../../components/Label";
import template from "./chatIem.hbs";
import { withStore } from "../../utils/Store";

export interface IChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: number;
  events: {
    click: () => void;
  };
}

export class ChatItemBase extends Block<IChatProps> {

  init() {
    this.children.smallAvatar = new Avatar({
      class: "chat_item__avatar",
    });

    this.children.labelChatName = new Label({
      value: this.props.title,
      class: "chat-info-name",
    });
  }
  
  render() {
      return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat});
  }
}



export const withSelectedChat = withStore(state => { 
  return {selectedChat: state.selectedChat} || undefined});

export const ChatItem = withSelectedChat(ChatItemBase as typeof Block);
