import Block from "../../components/Block";
import template from "./message.hbs";

export interface IMessageProps {
  content: string;
  isMine: boolean;
  class?: string;
}

export class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
