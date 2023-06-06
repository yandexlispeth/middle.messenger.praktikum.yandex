import Block from "../Block";
import Input from "../Input";
import Button from "../Button";
import MessagesController, {
  IMessage as IMessageInfo,
} from "../../controllers/MessagesController";
import Message from "../../blocks/Message";
import { withStore } from "../../utils/Store";
import template from './messenger.hbs'

interface IMessengerProps {
  selectedChat: number | undefined;
  messages: IMessageInfo[];
  userId: number;
}

export class MessengerBase extends Block<IMessengerProps> {
  constructor(props: IMessengerProps) {
    super(props);
  }

  protected init() {
    // this.children.messages = this.createMessages(this.props);

    this.children.messageInput = new Input({
      type: "text",
      name: "message",
      placeholder: "Введите ваше сообщение",
    });

    this.children.sendButton = new Button({
      label: "",
      events: {
        click: () => {
          const input = this.children.input as Input;
          const message = input.getValue();

          input.setValue("");

          MessagesController.sendMessage(this.props.selectedChat!, message);
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: IMessengerProps,
    newProps: IMessengerProps
  ): boolean {
    // this.children.messages = this.createMessages(newProps);

    return true;
  }

  // private createMessages(props: IMessengerProps) {
    // return this.props.messages.map((data) => {
    //   return new Message({ ...data, isMine: props.userId === data.user_id });
    // });
  // }

  protected render() {
    return this.compile(template, this.props);
  }
}

export const withSelectedChatMessages = withStore((state) => {
  const selectedChat = state.selectedChat;

  if (!selectedChat) {
    return {
      selectedChat: undefined,
      messages: [],
      userId: state.user?.data?.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChat] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.data?.id,
  };
});
