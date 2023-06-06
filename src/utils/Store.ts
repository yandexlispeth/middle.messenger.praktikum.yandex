import { IUser } from "../api/AuthApi";
import { EventBus } from "./EventBus";
import Block from "../components/Block";
import set from "../helpers/set";
import { IUserChangePassword } from "../api/UserApi";
import isEqual from "../helpers/isEqual";
import { IChatInfo } from "../api/ChatApi";
import Message from "../blocks/Message";

export interface State {
  user?: {
    data?: IUser;
    user_password: IUserChangePassword;
    error?: string;
    isLoading?: boolean;
  };
  chats?: IChatInfo[];
  selectedChat?: IChatInfo;
  modals?: {
    chat_settings?: boolean;
    chat_add?: boolean;
    chat_add_user?: boolean;
    chat_delete?: boolean;
  };
  messages?: Record<number, Message[]>;
}

enum StoreEvent {
  Updated = "updated",
}

// interface StoreData {
//   currentUser?: IUser;
// }

class Store extends EventBus {
  private state: State = {
    modals: {
      chat_settings: false,
      chat_add: false,
      chat_delete: false,
    },
  };

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvent.Updated);
  }

  getState(): State {
    return this.state;
  }
}

const store = new Store();

export const withStore =
  (mapStateToProps: (state: State) => Record<string, unknown>) =>
  (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvent.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({
              ...newState,
            });
          }
          state = newState;
        });
      }
    };
  };

export default store;
