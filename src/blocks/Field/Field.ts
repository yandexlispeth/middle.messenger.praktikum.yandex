import Block from "../../components/Block";
import Input from "../../components/Input/Input";
import ValidationError from "../../components/ValidationError";
import { validate } from "../../controllers/validate";
import template from "./field.hbs";

interface IFieldInputProps {
  type: string;
  name?: string;
  value?: string;
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
  private name: string | undefined;
  init() {
    const name = this.props.input.name;
    this.children.input = new Input({
      type: this.props.input.type,
      name: this.props.input.name,
      value: this.props.input.value,
      placeholder: this.props.input.placeholder,
      events: {
        blur: () => {
          const value = (this.children.input as Input).getValue();
          (this.children.validation_error as ValidationError).setProps({
            error_message: validate(name!, value),
          });
        },
      },
    });

    this.name = this.props.input.name;

    this.children.validation_error = new ValidationError(
      this.props.validation_error
    );
  }

  protected componentDidUpdate(
    _oldProps: IFieldProps,
    _newProps: IFieldProps
  ): boolean {
    if (_oldProps !== _newProps) {
      if(this.name === _newProps.input.name) {
        (this.children.input as Block).setProps(_newProps.input);
      }
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
