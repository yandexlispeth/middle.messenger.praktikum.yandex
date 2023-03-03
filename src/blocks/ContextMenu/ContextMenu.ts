import Block from "../../components/Block";
import template from "./contextMenu.hbs";

export class ContextMenu extends Block {
  render() {
    return this.compile(template, {});
  }
}
