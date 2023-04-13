import Block from "../components/Block";
import Router from "./router";

export interface WithRouterProps {
    router: typeof Router;
  }
  
  export function withRouter(Component: typeof Block<any>) {
    // type Props = typeof Component extends typeof Block<infer P> ? P : any;
    return class WithRouter extends Component {
      public static componentName = Component.name;
  
      constructor(props: any) {
        super({ ...props, router:Router});
      }
    };
  }

//  export function withControllers(Component: typeof Block) {

//   return class WithConroller extends 
//  }
