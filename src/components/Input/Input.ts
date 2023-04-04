import template from "./input.hbs";
import Block from "../Block";

interface IInputProps {
  type: string;
  name?: string;
  placeholder?: string;
  class?: string;
  events?: {
    focus?: () => void;
    blur?: () => void;
  };
}

export class Input extends Block<IInputProps, HTMLInputElement> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
