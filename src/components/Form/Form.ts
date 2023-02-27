import Block from "../../utils/Block";
import Input from "../Input";
import Button from "../Button";
import template from "./form.hbs";

interface IFormFieldProps {
  type: string;
  name?: string;
  placeholder?: string;
  className?: string;
  events?: {
    click: () => void;
  };
}

interface IFormButtonProps {
  label: string;
  class?: string;
}

interface IFormProps {
  fields: IFormFieldProps[];
  buttons: IFormButtonProps;
  class?: string
}

export class Form extends Block {
  constructor(props: IFormProps) {
    super(props);
  }

  init() {
    const form_fields: Input[] = [];

    this.props.fields.forEach((field_props: IFormFieldProps) => {
      form_fields.push(new Input(field_props));
    });
    this.children.fields = form_fields;

    this.children.button = new Button(this.props.buttons);
  }

  render() {
    return this.compile(template, this.props);
  }
}
