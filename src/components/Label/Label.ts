import Block from "../Block";
import template from "./label.hbs";


interface ILabelProps {
    value?: string,
    class?: string,
    events?: {
        click: () => void
    }
}

export class Label extends Block<ILabelProps> {
    render() {
        return this.compile(template, this.props);
    }

}
