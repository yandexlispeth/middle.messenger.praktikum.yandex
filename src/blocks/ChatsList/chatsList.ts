import template from "./chatsList.hbs";
import Block from "../../components/Block";
import { IChatInfo } from "../../api/ChatApi";
import ChatsController from "../../controllers/ChatsController";
import ChatItem from "../ChatItem";

interface IChatsListProps {
  chats?: IChatInfo[];
  selectedChat?:number;
  isLoaded?: boolean;
}

export class ChatsList extends Block<IChatsListProps> {
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
      return new ChatItem({
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
