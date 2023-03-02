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
  type?: string;
  class?: string;
}

interface IFormProps {
  fields: IFormFieldProps[];
  buttons: IFormButtonProps;
  class?: string;
  events?: {
    submit: (event: Event) => void;
  };
}

export class Form extends Block {
  constructor(props: IFormProps) {
    super(props);
  }

  init() {
    const form_fields: Input[] = [];

    console.log("ppoepi", this.props.fields);

    this.props.fields.forEach((field_props: IFormFieldProps) => {
      form_fields.push(new Input(field_props));
    });
    this.children.fields = form_fields;

    this.children.button = new Button(this.props.buttons);
  }

  render() {
    return this.compile(template, this.props);
  }

  dispatchComponentDidMount(): void {
    this.setProps({ events: { submit: (e: Event) => this.handleSubmit(e) } });
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(this.element as HTMLFormElement);
    let data_object = {};

    for(const [name, value] of formData) {
      console.log(name, value);
      data_object = Object.assign(data_object, {[name]: value});
    }
    console.log(data_object);
  }
}
