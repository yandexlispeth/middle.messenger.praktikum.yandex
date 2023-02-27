import Block from "../../utils/Block";
import template from "./button.hbs";

interface IButtonProps {
    label: string;
    className?: string;
    events?: {
        click: () => void
    }
}

export class Button extends Block {
    // <IButtonProps, HTMLButtonElement>{
    constructor(props: IButtonProps) {
        super(props);
    }

    init() {
        console.log('Button inited');
    }

    render() {
        return this.compile(template, this.props);
    }
}
