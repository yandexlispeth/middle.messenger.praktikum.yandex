import Block from "../../components/Block";
import Link from "../../components/Link";
import { renderDOM } from "../../utils/renderDOM";
import template from "./navigation.hbs";

interface ILinkProps {
  value: string;
  events?: {
    click: () => void;
  };
}

interface INavigationProps {
  link1: ILinkProps;
  link2: ILinkProps;
  events?: {
    click: () => void;
  };
}

export class Navigation extends Block<INavigationProps> {
  render() {
    return this.compile(template, this.props);
  }

  init() {
    this.children.link1 = new Link({
      label: "Авторизация",
      events: {
        click: () => renderDOM("authorization"),
      },
    });
    this.children.link2 = new Link({
      label: "Регистрация",
      events: {
        click: () => renderDOM("registration"),
      },
    });
  }
}
