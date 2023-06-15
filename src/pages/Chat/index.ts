import { IUser } from "../../api/AuthApi";
import { IChatInfo } from "../../api/ChatApi";
import ChatsList from "../../blocks/ChatsList";
import ContextMenu from "../../blocks/ContextMenu";
import AddChatPopup from "../../components/AddChatPopup";
import AddUserPopup from "../../components/AddUserPopup";
import Block from "../../components/Block";
import ChatSettingsPopup from "../../components/ChatSettingsPopup";
import DeleteChatConfirmPopup from "../../components/DeleteChatConfirmPopup";
import DeleteUserPopup from "../../components/DeleteUserPopup";
import Form from "../../components/Form";
import Label from "../../components/Label";
import Link from "../../components/Link";
import { Messenger } from "../../components/Messenger";
import { default as ChatController, default as ChatsController } from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";
import { Routes } from "../../index";
import store, { withStore } from "../../utils/Store";
import template from "./chat.hbs";

interface IChatPageProps {
  chats: IChatInfo[];
  selectedChat: number;
  userId: number;
  modals?: {
    chat_settings?: boolean;
    chat_add?: boolean;
    chat_delete?: boolean;
    chat_add_user?: boolean;
    chat_delete_user?: boolean;
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

      onDeleteUser: () => {
        this.setProps({ modals: { chat_settings: false } });
        ChatsController.getUsersFromChat(store.getState().selectedChat!).then(
          (response: IUser[]) => {
            this.setProps({ modals: { chat_delete_user: true } });
            (this.children.deleteUserPopup as DeleteUserPopup).setProps({
              users: response,
            });
          }
        );
      },
    });

    this.children.addChatPopup = new AddChatPopup({});
    this.children.deleteChatPopup = new DeleteChatConfirmPopup({});
    this.children.addUserPopup = new AddUserPopup({
      onUserItemClick: (user_id: number) => {
        ChatsController.addUserToChat(store.getState().selectedChat!, user_id);
        this.setProps({ modals: { chat_add_user: false } });
        store.set("foundUsers", []);
      },
    });

    this.children.deleteUserPopup = new DeleteUserPopup({
      onUserItemClick: (user_id: number) => {
        ChatsController.deleteUserFromChat(
          store.getState().selectedChat!,
          user_id
        );
        this.setProps({ modals: { chat_delete_user: false } });
      },
    });
    this.children.messenger = new Messenger({});
    this.children.messageForm = new Form({
      id: "messageForm",
      fields: [
        {
          input: {
            type: "text",
            name: "message",
            placeholder: "Введите ваше сообщение",
          },
          class: "messenger-field",
        },
      ],
      button: {
        label: "",
        type: "submit",
        events: {
          click: (e) => {
            e.preventDefault();
            const form = this.children.messageForm as Form;
            const form_values = form.getValues();
            if (form.getValues() !== "") {
              MessagesController.sendMessage(
                this.props.selectedChat!,
                form_values.message
              );
              form.reset();
            }
          },
        },
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();
        },
      },
    });
  }

  protected componentDidUpdate(
    _oldProps: IChatPageProps,
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
      isUserDeletePopupShown: this.props.modals?.chat_delete_user,
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
