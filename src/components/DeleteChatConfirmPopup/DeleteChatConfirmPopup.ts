import Button from "../Button";
import template from "./deleteChatConfirmPopup.hbs";
import ChatController from "../../controllers/ChatsController";
import store from "../../utils/Store";
import Block from "../Block";

export class DeleteChatConfirmPopup extends Block {
    init() {
        this.children.btnConfirm = new Button({
            label: "Да",
            events: {
                click: () => this.deleteChat()
            }
        });

        this.children.btnCancel = new Button({
            label: "Отмена",
            events: {
                click: () => (this.element as HTMLElement).remove(),
            }
        })
    }

    private deleteChat() {
        const selectedChat = store.getState().selectedChat;
        if(selectedChat) {
            ChatController.delete(store.getState().selectedChat!);
            store.set("modals.chat_add", false);
            store.set("selectedChat", undefined);

        }
        return;
    }

    render() {
        return this.compile(template, this.props);
    }
}
