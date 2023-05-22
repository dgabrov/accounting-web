import {Action} from "redux";
import {IStore} from "../../state/store";
import {UserData} from "../../data/user-data";

export const ACTION_LOGIN : string = "login";

export interface ActionLogin extends Action<String> {
    type: string;
    user: UserData
}

export const createActionLogin = (user: UserData): ActionLogin => {
    return {
        type: ACTION_LOGIN,
        user
    }
}

export const processActionLogin = (store: IStore, action: ActionLogin) : IStore => {
    const {user} = action;

    return {...store, user}
}
