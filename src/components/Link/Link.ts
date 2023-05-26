import Block from "../Block";
import template from "./link.hbs";
import Router from "../../utils/Router";

interface ILinkProps {
  label: string;
  to?:string;
  class?: string;
  events?: {
    click: (e:Event) => void;
  };
}

export class Link extends Block<ILinkProps>{
  constructor(props: ILinkProps) {
    super({
      events: {
        click: (e:Event) => {
            this.navigate(e)
        }
      },
        ...props
    });
  }

  navigate(e:Event) {
      e.preventDefault();
      if(this.props.to) {
          Router.go(this.props.to);
      } else {
          this.props.events?.click(e);
      }
  }

  

  render() {
    return this.compile(template, this.props);
  }
}
