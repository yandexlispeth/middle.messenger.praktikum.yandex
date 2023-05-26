import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import ContextMenu from "../../blocks/ContextMenu";
import Input from "../../components/Input";
import Message from "../../blocks/Message";
import Block from "../../components/Block";
import template from "./chat.hbs";
import Field from "../../blocks/Field";
import Link from "../../components/Link";
import { Routes } from "../../index";
import store, { withStore } from "../../utils/Store";
import ChatController from "../../controllers/ChatsController";
import ChatsList from "../../blocks/ChatsList/chatsList";
import ChatSettingsPopup from "../../components/ChatSettingsPopup";
import AddChatPopup from "../../components/AddChatPopup";
import DeleteChatConfirmPopup from "../../components/DeleteChatConfirmPopup";

interface IChatPageProps {
  chats: [];
  selectedChat: number;
  userId: number;
  modals?: {
    chat_settings?: boolean;
    chat_add?: boolean;
    chat_delete?: boolean;
  };
}
class ChatPageBase extends Block<IChatPageProps> {
  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    ChatController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      })
    });
    
    
    const text =
      "Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua.";

    const text2 = "Класс, спасибо за информацию!";

    this.children.labelProfile = new Link({
      label: "Профиль > ",
      to: Routes.Profile,
    });

    this.children.inputSearch = new Input({
      type: "text",
      name: "search",
      placeholder: "Поиск",
    });


    this.children.smallAvatar = new Avatar({
      class: "avatar_small",
    });

    this.children.contextMenu = new ContextMenu({
      events: {
        click: () => {
          this.toggleDialog();
        },
      },
    });

    this.children.chatMenu = new ChatSettingsPopup({
      onAddClick: () => {
        this.setProps({ modals: { chat_settings: false } });
        this.setProps({ modals: { chat_add: true } });
      },
      onDeleteClick: () => {
        this.setProps({ modals: { chat_settings: false } });
        this.setProps({ modals: { chat_delete: true } });
      },
    });
    this.children.addChatPopup = new AddChatPopup({});
    this.children.deleteChatPopup = new DeleteChatConfirmPopup({});

    this.children.messageLeft = new Message({
      message_text: text,
      is_left: true,
      message_time: "20:00",
    });

    this.children.messageRight = new Message({
      message_text: text2,
      is_left: false,
      message_time: "10:00",
    });

    this.children.messagesField = new Field({
      input: {
        type: "text",
        name: "message",
        placeholder: "Сообщение",
      },
    });

    this.children.sendButton = new Button({});
  }

  protected componentDidUpdate(oldProps: IChatPageProps, newProps: IChatPageProps) {
    if(newProps.chats) {
      (this.children.chatsList as Block).setProps({chats: newProps.chats});
    }

    if(newProps.selectedChat) {
      (this.children.chatsList as Block).setProps({selectedChat: newProps.selectedChat});
    }
    return true;
  }

  render() {
    return this.compile(template, {
      isChatSettingsPopupShown: this.props.modals?.chat_settings,
      isChatAddPopupShown: this.props.modals?.chat_add,
      isChatDeletePopupShown: this.props.modals?.chat_delete,
    });
  }

  // protected componentDidMount(): void {
  //   ChatController.fetchChats();
  // }
  



  toggleDialog() {
    const isChatPopupShown = this.props.modals?.chat_settings;
    if (isChatPopupShown) {
      this.setProps({
        modals: { chat_settings: false },
      });
    } else {
      this.setProps({
        modals: { chat_settings: true },
      });
    }
  }
}

const withelectedhatMessages = withStore((state) => {
  const selectedChat = state.selectedChat;

  if (!selectedChat) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.data?.id,
    };
  }

  return {
    messages: state.chats || [],
    selectedChat: state.selectedChat,
    userId: state.user?.data?.id,
    chatSettingsPopupShown: state.modals?.chat_settings,
  };
});

export const ChatPage = withStore((state) => {
  return {
    chats: state.chats || [],
    selectedChat: state.selectedChat,
    userId: state.user?.data?.id,
    isShown: state.modals?.chat_settings,
  };
})(ChatPageBase as typeof Block);
