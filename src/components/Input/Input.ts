import template from "./input.hbs";
import Block from "../Block";

interface IInputProps {
  type: string;
  name?: string;
  placeholder?: string;
  class?: string;
  id?: string;
  events?: {
    focus?: () => void;
    blur?: () => void;
  };
}

export class Input extends Block<IInputProps, HTMLInputElement> {
  setValue(value:string) {
    return (this.element as HTMLInputElement).value = value;
  }
  getValue() {
    return (this.element as HTMLInputElement).value;
  }


  render() {
    return this.compile(template, this.props);
  }
}
