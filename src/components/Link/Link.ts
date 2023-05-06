import { WithRouterProps } from "../../utils/withRouter";
import Block from "../Block";
import template from "./link.hbs";

interface ILinkProps extends WithRouterProps {
  label: string;
  to?:string;
  class?: string;
  events?: {
    click: (e:MouseEvent) => void;
  };
}

export class Link extends Block{
  constructor(props: ILinkProps) {
    super({
     ...props,
      events: {
        click: () => {
            // e.preventDefault();
            this.navigate()
        }
      }
    });
  }

  navigate() {
      if(this.props.router.to) {
          this.props.router.go(this.props.to);
      }
      console.log(this.props);
  }

  

  render() {
    return this.compile(template, this.props);
  }
}
