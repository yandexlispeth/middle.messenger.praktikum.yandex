import Block from "../../utils/Block";
import template from "./label.hbs";


interface ILabel {
    value: string,
    class?: string,
    events?: {
        click: () => void
    }
}

export class Label extends Block {
    constructor(props:ILabel) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }

}
