import {Action} from "redux";
import {IStore} from "../../state/store";
import {createEmptyStore} from "../../state/default-store";

export const ACTION_CLEAR_STORE : string = "action_clear_store";

export interface ActionClearStore extends Action<String> {
    type: string;
}

export const createActionClearStore = (): ActionClearStore => {
    return {
        type: ACTION_CLEAR_STORE
    }
}

export const processActionClearStore = (store: IStore, action: ActionClearStore) : IStore => {
    return createEmptyStore();
}
