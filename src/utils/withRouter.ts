import Block from "../components/Block";
import Router from "./Router";

export interface WithRouterProps {
    router?: typeof Router;
  }
  
  export function withRouter(Component: typeof Block<any>) {
    return class WithRouter extends Component {
      public static componentName = Component.name;
  
      constructor(props: any) {
        super({ ...props, router:Router});
      }
    };
  }
