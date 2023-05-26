import Block from "../../components/Block";
import template from "./contextMenu.hbs";

interface IContextMenu {
  events?: {
    click?: () => void;
  };
}
export class ContextMenu extends Block<IContextMenu> {
  render() {
    return this.compile(template, this.props);
  }
}
