import {Action} from "redux";
import {IStore} from "../../state/store";

export const ACTION_MESSAGE : string = "message";

export interface ActionMessage extends Action<String> {
    type: string;
    visible: boolean;
    error: boolean;
    message: string;
}

export const createActionMessage = (visible: boolean, error: boolean, message: string ): ActionMessage => {
    return {
        type: ACTION_MESSAGE,
        visible,
        error,
        message
    }
}

export const createHideMessageAction = () : ActionMessage => {
    return createActionMessage(false, false, "");
}

export const processActionMessage = (store: IStore, action: ActionMessage) : IStore => {
    const {visible, error, message} = action;


    return {...store, message:{visible, error, message}}
}
