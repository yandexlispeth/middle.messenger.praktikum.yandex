import template from "./input.hbs";
import Block from "../Block";

interface IInput {
  type: string;
  name?: string;
  placeholder?: string;
  class?: string;
  events?: {
    focus?: () => void;
    blur?: () => void;
  };
}

export class Input extends Block {
  constructor(props: IInput) {
    super(props);
  }

  init() {
    console.log("Input inited");
  }

  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
