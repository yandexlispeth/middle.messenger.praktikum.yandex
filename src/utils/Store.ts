import {IUser} from "../api/AuthApi";
import {EventBus} from "./EventBus";
import Block from "../components/Block";
import set from "../helpers/set";
import {IUserChangePassword} from "../api/UserApi";
import isEqual from "../helpers/isEqual";

interface State {
    user?: {
        data?: IUser,
        user_password:IUserChangePassword
        error?: string;
        isLoading?: boolean;
    },
    chats?: any[]
}

enum StoreEvent {
    Updated = "updated",
}

// interface StoreData {
//   currentUser?: IUser;
// }

class Store extends EventBus {
    private state: State = {};

    set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvent.Updated);
    }

    getState(): State {
        // console.log("getState", this.state);
        return this.state;
    }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => Record<string, unknown>) => (Component: typeof Block) => {
    let state: any;

    return class WithStore extends Component {
        constructor(props: any) {
            state = mapStateToProps(store.getState());

            super({...props, ...state});

            store.on(StoreEvent.Updated, () => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(state, newState)) {
                    this.setProps({
                        ...newState
                    })
                }
                state = newState;
            });
        }
    }
}

export default store;
