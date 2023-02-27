import Block from "../../utils/Block";
import template from "./label.hbs";


interface ILabel {
    text: string,
    class?: string
}

export class Label extends Block {
    constructor(props:ILabel) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }

}
