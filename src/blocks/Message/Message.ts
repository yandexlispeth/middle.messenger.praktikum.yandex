import Block from "../../components/Block";
import template from "./message.hbs";

interface IMessageProps {
  message_text?: string;
  is_left?: boolean;
  class?: string;
  message_time?: string;
}

export class Message extends Block<IMessageProps> {
  render() {
    this.props.class = this.props.is_left ? "message_left" : "message_right";
    return this.compile(template, this.props);
  }
}
