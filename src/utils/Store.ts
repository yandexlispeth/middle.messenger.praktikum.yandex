import {IUser} from "../api/AuthApi";
import set from "../helpers/set";
import {EventBus} from "./EventBus";
import isEqual from "./isEqual";
import Block from "../components/Block";

interface State {
    user?: {
        data?: IUser
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

        this.emit(StoreEvent.Updated, this.state);
    }

    getState(): State {
        return this.state;
    }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => Record<string, unknown>) => (Component: typeof Block) => {
    let propsFromState: any;

    return class extends Component {
        constructor(props: any) {
            propsFromState = mapStateToProps(store.getState());

            super({...props, ...propsFromState});

            store.on(StoreEvent.Updated, () => {
                const newPropsFromState = mapStateToProps(store.getState());

                if (isEqual(propsFromState, newPropsFromState)) {
                    return;
                }
                this.setProps({
                    ...newPropsFromState
                })
            });
        }
    }
}

export default store;
