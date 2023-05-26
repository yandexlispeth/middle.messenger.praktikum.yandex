import Block from "../Block";


// interface IPopup {}
  // events?:{
  //   onClose?: () => void;
  // }

export class Popup extends Block {
  // init() {
  //   const menu_items: Link[] = [];
  //   if(Array.isArray(this.props.menu_items)) {
  //       this.props.menu_items.forEach((item: IItemsLink) => {
  //           menu_items.push(new Link(item));
  //       })
  //   }

  //   this.children.menu_items = menu_items;

  // }

  // render() {
  //   return this.compile(template, this.props);
  // }

  showPopup() {
    this.element!.style.display = "auto";
  }

  hidePopup() {
    this.element!.remove;
  }
}
