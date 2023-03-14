import template from "./validation_error.hbs";
import Block from "../Block";

interface IValidationErrorProps {
  error_message?: string;
}

export class ValidationError extends Block<IValidationErrorProps> {
  render() {
    return this.compile(template, this.props);
  }
}
