import template from './validation_error.hbs';
import Block from "../../utils/Block";

interface IValidationErrorProps {
  error_message: string;
}

export class ValidationError extends Block {
  constructor(props: IValidationErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
