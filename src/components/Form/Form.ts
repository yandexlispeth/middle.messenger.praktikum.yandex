import Block from "../Block";
import Button from "../Button";
import template from "./form.hbs";
import Field from "../../blocks/Field";


interface IFormValidationErrorProps {
  error_message?:string;
}
interface IFormFieldProps {
  input: {
    type: string;
    name?: string;
    placeholder?: string;
    className?: string;
    events?: {
      focus?: () => void;
      blur?: () => void;
    };
    validation_error?: IFormValidationErrorProps;
  };
}

interface IFormButtonProps {
  label: string;
  type?: string;
  class?: string;
}

interface IFormProps {
  fields: IFormFieldProps[] | IFormFieldProps;
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
    const form_fields: Field[] = [];

    this.props.fields.forEach((field: IFormFieldProps) => {
      form_fields.push(new Field(field));
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

    for (const [name, value] of formData) {
      data_object = Object.assign(data_object, { [name]: value });
    }
    console.log(data_object);
  }
}
