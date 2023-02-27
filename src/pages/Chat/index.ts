import Input from "../../components/Input";
import Label from "../../components/Label";
import Block from "../../utils/Block";
import template from "./chat.hbs";

interface IChatProps {}

export class ChatPage extends Block {
    constructor(props: IChatProps) {
        super(props);
    }

    init() {
        this.children.labelProfile = new Label({
            text: "Профиль",
            class: "label-profile"
        });

        this.children.inputSearch = new Input({
            type: "text",
            name: "search",
            placeholder: "Поиск",
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
