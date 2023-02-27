import Block from "../../utils/Block";
import template from './navigation.hbs';


interface INavigationProps {
    link1:string;
    link2:string;
    menu_title1:string;
    menu_title2:string;
    events?: {
        click: () => void;
    }
}

export class Navigation extends Block {
    constructor(props:INavigationProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }

}
