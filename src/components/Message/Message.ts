import Block from "../../utils/Block";
import template from "./message.hbs";


interface IMessageProps {
    message_text?:string;
    is_left? :boolean,
    class?:string,
    message_time?:string
}

export class Message extends Block {
    constructor(props:IMessageProps) {
        super(props);
    }

    render() {
        this.props.class = this.props.is_left ? "message_left" : "message_right";
        return this.compile(template, this.props);
    }
}
