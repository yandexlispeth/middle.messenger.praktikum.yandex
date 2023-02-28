import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import ChatMessageItem from "../../components/ChatMessageItem";
import { ContextMenu } from "../../components/ContextMenu/ContextMenu";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Message from "../../components/Message";
import Block from "../../utils/Block";
import template from "./chat.hbs";


export class ChatPage extends Block {

    init() {
        const text = "Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua."

        const text2 = "Класс, спасибо за информацию!";

        this.children.labelProfile = new Label({
            value: "Профиль > ",
            class: "label-profile"
        });

        this.children.inputSearch = new Input({
            type: "text",
            name: "search",
            placeholder: "Поиск",
        });

        this.children.chatMessageItem1 = new ChatMessageItem({
            avatar: {
                class: "avatar_small"
            },
            labelChatName: {
                value: "Андрей",
            },
            labelChatInfo: {
                value: "Изображение",
            },
            labelChatTime: {
                value: "10:50",
            }
        });

        this.children.chatMessageItem2 = new ChatMessageItem({
            avatar: {
                class: "avatar_small"
            },
            labelChatName: {
                value: "Андрей",
            },
            labelChatInfo: {
                value: "Изображение",
            },
            labelChatTime: {
                value: "10:50",
            }
        });

        this.children.chatMessageItem3 = new ChatMessageItem({
            avatar: {
                class: "avatar_small"
            },
            labelChatName: {
                value: "Андрей"
            },
            labelChatInfo: {
                value: "Изображение"
            },
            labelChatTime: {
                value: "10:50"
            }
        });

        this.children.smallAvatar = new Avatar({
            class: "avatar_small"
        });

        this.children.contextMenu = new ContextMenu({});

        this.children.messageLeft = new Message({
            message_text: text,
            is_left: true,
            message_time: "20:00"
        });

        this.children.messageRight = new Message({
            message_text: text2,
            is_left: false,
            message_time: "10:00"
        });

        this.children.messagesInput = new Input({
            type: "text",
            name: "messages",
            placeholder: "Сообщение"
        });

        this.children.sendButton = new Button({});
    }

    render() {
        return this.compile(template, this.props);
    }
}
