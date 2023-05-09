import template from "./avatar.hbs";
import Block from "../Block";

interface IAvatarProps {
    src?:string;
    class?:string;
}

export class Avatar extends Block<IAvatarProps> {

    render() {
        return this.compile(template, this.props);
    }
}
