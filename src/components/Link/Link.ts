import Block from "../Block";
import template from "./link.hbs";

interface ILinkProps {
  label: string;
  events?: {
    click: () => void;
  };
}

export class Link extends Block<ILinkProps> {
  render() {
    return this.compile(template, this.props);
  }
}
