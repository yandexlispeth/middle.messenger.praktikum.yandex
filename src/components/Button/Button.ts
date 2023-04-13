import Block from "../Block";
import template from "./button.hbs";

interface IButtonProps {
  label?: string;
  class?: string;
  events?: {
    click: (e:Event) => void;
  };
}

export class Button extends Block<IButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}
