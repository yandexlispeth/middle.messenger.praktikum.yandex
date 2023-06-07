import Avatar from "../../components/Avatar";
import ContextMenu from "../../blocks/ContextMenu";
import Block from "../../components/Block";
import template from "./chat.hbs";
import Link from "../../components/Link";
import { Routes } from "../../index";
import { withStore } from "../../utils/Store";
import ChatController from "../../controllers/ChatsController";
import ChatSettingsPopup from "../../components/ChatSettingsPopup";
import AddChatPopup from "../../components/AddChatPopup";
import DeleteChatConfirmPopup from "../../components/DeleteChatConfirmPopup";
import ChatsList from "../../blocks/ChatsList";
import { Messenger } from "../../components/Messenger";
import AddUserPopup from "../../components/AddUserPopup";
import Label from "../../components/Label";
import { IChatInfo } from "../../api/ChatApi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MessagesController from "../../controllers/MessagesController";

interface IChatPageProps {
  chats: IChatInfo[];
  selectedChat: number;
  userId: number;
  modals?: {
    chat_settings?: boolean;
    chat_add?: boolean;
    chat_delete?: boolean;
    chat_add_user?: boolean;
  };
}
class ChatPageBase extends Block<IChatPageProps> {
  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    ChatController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });

    this.children.labelProfile = new Link({
      label: "Профиль >",
      to: Routes.Profile,
    });

    this.children.labelCreateChat = new Link({
      label: "Новый чат",
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          this.setProps({ modals: { chat_add: true } });
        },
      },
    });

    this.children.smallAvatar = new Avatar({
      class: "avatar_small",
    });

    this.children.chatTitle = new Label({});

    this.children.chatDate = new Label({
      value: new Date().toDateString(),
    });

    this.children.contextMenu = new ContextMenu({
      events: {
        click: () => {
          this.toggleDialog();
        },
      },
    });

    this.children.chatSettingsMenu = new ChatSettingsPopup({
      onDeleteClick: () => {
        this.setProps({ modals: { chat_settings: false } });
        this.setProps({ modals: { chat_delete: true } });
      },

      onAddUser: () => {
        this.setProps({ modals: { chat_settings: false } });
        this.setProps({ modals: { chat_add_user: true } });
      },
    });

    this.children.addChatPopup = new AddChatPopup({});
    this.children.deleteChatPopup = new DeleteChatConfirmPopup({});
    this.children.addUserPopup = new AddUserPopup({
      onUserItemClick: () => this.setProps({modals: { chat_add_user: false }})
    });
    this.children.messenger = new Messenger({});
    this.children.messageInput = new Input({
      type: "text",
      name: "message",
      placeholder: "Введите ваше сообщение",
    });

    this.children.sendButton = new Button({
      label: "",
      events: {
        click: (e) => {
          e.preventDefault();
          MessagesController.sendMessage(
            this.props.selectedChat!,
            (this.children.messageInput as Input).getValue()
          );
          (this.children.messageInput as Input).setValue("");
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: IChatPageProps,
    newProps: IChatPageProps
  ) {
    if (newProps.chats) {
      (this.children.chatsList as Block).setProps({ chats: newProps.chats });
    }

    if (newProps.selectedChat) {
      (this.children.chatsList as Block).setProps({
        selectedChat: newProps.selectedChat,
      });
      (this.children.chatTitle as Label).setProps({
        value: this.props.selectedChat.toString(),
      });
    }
    return true;
  }

  render() {
    return this.compile(template, {
      isChatSettingsPopupShown: this.props.modals?.chat_settings,
      isChatAddPopupShown: this.props.modals?.chat_add,
      isChatDeletePopupShown: this.props.modals?.chat_delete,
      isUserAddPopupShown: this.props.modals?.chat_add_user,
      isSelectedChat: this.props.selectedChat,
    });
  }

  toggleDialog() {
    const isChatPopupShown = this.props.modals?.chat_settings;
    if (isChatPopupShown) {
      this.setProps({ modals: { chat_settings: false } });
    } else {
      this.setProps({ modals: { chat_settings: true } });
    }
  }
}

export const ChatPage = withStore((state) => {
  return {
    chats: state.chats || [],
    selectedChat: state.selectedChat,
    userId: state.user?.data?.id,
    modals: state.modals,
  };
})(ChatPageBase as typeof Block);
