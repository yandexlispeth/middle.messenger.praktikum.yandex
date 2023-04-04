import Block from "../../components/Block";
import Link from "../../components/Link";
import template from "./navigation.hbs";

interface ILinkProps {
  value: string;
  events?: {
    click: () => void;
  };
}


export class Navigation extends Block {
  render() {
    return this.compile(template, this.props);
  }

  init() {
    this.children.link1 = new Link({
      label: "Авторизация",
      to: "/",
    });
    this.children.link2 = new Link({
      label: "Регистрация",
      to: "/signup",
    });
  }
}
