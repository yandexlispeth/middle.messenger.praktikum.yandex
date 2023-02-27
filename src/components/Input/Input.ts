import template from "./input.hbs";
import Block from "../../utils/Block";

interface IInput {
  type: string;
  name?: string;
  placeholder?: string;
  class?: string;
  events?: {
    click: () => void;
    // onfocus: () => void;
    // onblur: () => void;
  };
}

export class Input extends Block {
  constructor(props: IInput) {
    super(props);
  }

  init() {
    console.log("Input inited");
  }

  //   dispatchComponentDidMount(): void {
  //     console.log('МЕня вызвали');
  //       Object.entries(this.props).forEach(([key, value]) => {
  //         this.element?.setAttribute(key, "text");
  //       })
  //   }\

  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    // this.element.classList.add(this.props.className);
    return this.compile(template, this.props);
  }
}
