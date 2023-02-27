import template from "./avatar.hbs";
import Block from "../../utils/Block";

interface IAvatar {
    class:string;
}

export class Avatar extends Block {
    constructor(props:IAvatar) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);

    }
}
