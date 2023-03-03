import Link from "../../components/Link";
import Block from "../../components/Block";
import { renderDOM, ROUTES } from "../../utils/renderDOM";
import template from "./homePage.hbs";

interface LinkType {
  label: string;
  route: keyof typeof ROUTES;
  props?: any;
}

const links: LinkType[] = [
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
  {
    label: "404",
    route: "error_page",
    props: {
      error_code: "404",
      error_message: "Извините, здесь ничего нет",
    },
  },
  {
    label: "500",
    route: "error_page",
    props: {
      error_code: "500",
      error_message: "Что-то сломалось, но фиксики уже  в пути",
    },
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
            click: () => renderDOM(link.route, link.props),
          },
        })
      );
    });

    this.children.links = links_arr;
  }

  render() {
    return this.compile(template, this.props);
  }
}
