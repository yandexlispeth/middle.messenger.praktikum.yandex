import template from "./chatsList.hbs";
import Block from "../../components/Block";
import { IChatInfo } from "../../api/ChatApi";
import Chat from "../Chat";
import ChatsController from "../../controllers/ChatsController";

interface IChatsListProps {
  chats?: IChatInfo[];
  selectedChat?:number;
  isLoaded?: boolean;
}

export default class ChatsList extends Block<IChatsListProps> {
  init() {
    // this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(
    oldProps: IChatsListProps,
    newProps: IChatsListProps
  ): boolean {
    
    if(newProps.chats) {
      this.children.chats = this.createChats(newProps.chats);
    }
    return true;
  }

  private createChats(chats: IChatInfo[]) {
    return chats.map((data: IChatInfo) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
