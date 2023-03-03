import Block from "../Block";
import template from "./link.hbs";

interface ILinkProps {
    label:string,
    events?:{
        click: () => void
    }

}

export class Link extends Block {
    constructor(props:ILinkProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
