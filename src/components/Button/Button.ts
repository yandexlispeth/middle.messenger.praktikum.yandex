import { Block } from "../../utils/Block";
import template from "./button.hbs";

interface IButtonProps {
    label: string;
    events: {
        click: () => void
    }
}


export class Button extends Block {
    constructor(props: IButtonProps) {
        super('button', props);
        this.props = props;
    }

    init() {
        console.log('Button inited');
    }

    render() {
        return this.compile(template, this.props);
    }

    private props;
}
