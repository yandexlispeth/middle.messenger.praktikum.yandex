import Block from "../../components/Block";
import template from "./error_page.hbs";

interface IErrorPageProps {
  error_code: string;
  error_message: string;
}

export default class ErrorPage extends Block<IErrorPageProps> {
  render() {
    return this.compile(template, this.props);
  }
}
