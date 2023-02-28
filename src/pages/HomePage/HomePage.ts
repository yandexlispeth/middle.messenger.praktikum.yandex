import Link from "../../components/Link";
import Block from "../../utils/Block";
import { renderDOM, ROUTES } from "../../utils/renderDOM";
import template from "./homePage.hbs";

interface LinkType{
    label: string,
    route:keyof typeof ROUTES

}

const links:LinkType[] = [
  {
    label: "Авторизация",
    route: "authorization",
  },
  {
    label: "Регистрация",
    route: "registration",
  },
  {
    label: "Страница с чатом",
    route: "chat",
  },
  {
    label: "Страница настроек пользователя",
    route: "user_settings",
  },
  {
    label: "Страница смены пароля",
    route: "user_change_password",
  },
];

export class HomePage extends Block {
  init() {
    const links_arr: Block | Block[] = [];
    
    links.forEach((link) => {
      links_arr.push(
        new Link({
          label: link.label,
          events: {
            click: () => renderDOM(link.route)
          }
        })
      );
    });

    this.children.links = links_arr;
  }

  render() {
    return this.compile(template, this.props);
  }
}
