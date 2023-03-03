import Block from "../../components/Block";
import template from "./contextMenu.hbs";


export class ContextMenu extends Block {
    constructor(props:any) {
        super(props);
    }


    render() {
        return this.compile(template, {});
    }
}
