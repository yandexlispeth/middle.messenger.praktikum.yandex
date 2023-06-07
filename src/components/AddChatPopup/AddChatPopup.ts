import Input from "../Input";
import Button from "../Button";
import ChatController from "../../controllers/ChatsController";
import template from "./addChatPopup.hbs";
import store from "../../utils/Store";
import Block from "../Block";
import Label from "../Label";

export class AddChatPopup extends Block {
  init(): void {
    this.children.inputChatTitle = new Input({
      type: "text",
      name: "title",
      placeholder: "Название чата",
    });

    this.children.confirmButton = new Button({
      label: "Создать чат",
      events: {
        click: (e: Event) => this.createChat(e),
      },
    });

    this.children.cancelButton = new Button({
      label: "Отмена",
      events: {
        click: (e:Event) => {
            e.preventDefault();
          (this.element as HTMLElement).remove();
          (this.children.validationError as Label).setProps({ value: "" });
        },
      },
    });

    this.children.validationError = new Label();
  }

  private createChat(e: Event) {
    e.preventDefault();
    const input = this.children.inputChatTitle as Input;
    if (input.getValue() !== "") {
      ChatController.create(input.getValue());
      input.setValue("");
      store.set("modals.chat_add", false);
      (this.children.validationError as Label).setProps({ value: "" });
      return;
    }
    (this.children.validationError as Label).setProps({
      value: "Введите название чата",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
