import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import ChatMessageItem from "../../blocks/ChatMessageItem";
import ContextMenu from "../../blocks/ContextMenu";
import Input from "../../components/Input";
import Message from "../../blocks/Message";
import Block from "../../components/Block";
import template from "./chat.hbs";
import Field from "../../blocks/Field";
import Link from "../../components/Link";


export default class ChatPage extends Block {

    init() {
        const text = "Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua."

        const text2 = "Класс, спасибо за информацию!";

        this.children.labelProfile = new Link({
            label: "Профиль > ",
            to: "/settings",
            // class: "label-profile",
            // events: {
            //     click: () => renderDOM("user_settings")
            // }
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
                value: "Максим",
            },
            labelChatInfo: {
                value: "Документ",
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
                value: "Женя"
            },
            labelChatInfo: {
                value: "Изображение"
            },
            labelChatTime: {
                value: "Вчера"
            }
        });

        this.children.chatMessageItem4 = new ChatMessageItem({
            avatar: {
                class: "avatar_small"
            },
            labelChatName: {
                value: "Мамочка"
            },
            labelChatInfo: {
                value: "Видео"
            },
            labelChatTime: {
                value: "11:50"
            }
        });

        this.children.chatMessageItem5 = new ChatMessageItem({
            avatar: {
                class: "avatar_small"
            },
            labelChatName: {
                value: "Рабочий чат"
            },
            labelChatInfo: {
                value: "Документ"
            },
            labelChatTime: {
                value: "09:50"
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

        this.children.messagesField = new Field({
            input: {
                type: "text",
                name: "message",
                placeholder: "Сообщение"
            }
        });

        this.children.sendButton = new Button({});
    }

    render() {
        return this.compile(template, this.props);
    }
}
