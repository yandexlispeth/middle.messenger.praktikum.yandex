import Popup from "../Popup";
import Input from "../Input";
import Button from "../Button";
import ChatController from "../../controllers/ChatsController";
import template  from "./addChatPopup.hbs";


export class AddChatPopup extends Popup {
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

    createChat() {
        (this.element as HTMLElement).remove()
        ChatController.create((this.children.inputChatTitle  as Input).value);
    }

    render() {
        return this.compile(template, {});
    }
}
