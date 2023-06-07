import Input from "../Input";
import Button from "../Button";
import ChatController from "../../controllers/ChatsController";
import template  from "./addChatPopup.hbs";
import store from "../../utils/Store";
import Block from "../Block";


export class AddChatPopup extends Block {
    init(): void {
        this.children.inputChatTitle = new Input({
            type: "text",
            name: "title",
            placeholder: "Название чата"
        });
        
        this.children.confirmButton = new Button({
            label: "Создать чат",
            events: {
                click: () => this.createChat()
            }
        });

        this.children.cancelButton = new Button({
            label: "Отмена",
            events: {
                click: () => (this.element as HTMLElement).remove()
            }
        })
    }

    private createChat() {
        ChatController.create((this.children.inputChatTitle  as Input).getValue());
        (this.children.inputChatTitle as Input).setValue('')
        store.set('modals.chat_add', false);
        
    }

    render() {
        return this.compile(template, {});
    }
}
