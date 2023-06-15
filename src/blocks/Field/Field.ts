import Block from "../../components/Block";
import Input from "../../components/Input/Input";
import ValidationError from "../../components/ValidationError";
import { validate } from "../../controllers/validate";
import template from "./field.hbs";

interface IFieldInputProps {
  type: string;
  name?: string;
  placeholder?: string;
  class?: string;
  events?: {
    focus?: () => void;
    blur?: () => void;
  };
}

interface IFieldValidationErrorProps {
  error_message?: string;
}

interface IFieldProps {
  input: IFieldInputProps;
  validation_error?: IFieldValidationErrorProps;
  class?: string;
}

export class Field extends Block<IFieldProps> {
  init() {
    this.children.input = new Input({
      type: this.props.input.type,
      name: this.props.input.name,
      placeholder: this.props.input.placeholder,
      events: {
        blur: () => {
          const value = (this.children.input as Input).getValue();
          (this.children.validation_error as ValidationError).setProps({
            error_message: validate(this.props.input.name!, value),
          });
        },
      },
    });

    this.children.validation_error = new ValidationError(
      this.props.validation_error
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
