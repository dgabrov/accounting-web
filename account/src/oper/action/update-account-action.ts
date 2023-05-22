import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_EDIT_ACCOUNT} from "../../state/constants";

export const ACTION_UPDATE_ACCOUNT : string = "ACTION_UPDATE_ACCOUNT";

export interface ActionUpdateAccount extends Action<String> {
    type: string;
    id: string;
    adding: boolean;
}

export const createActionUpdateAccount = (id: string, adding: boolean): ActionUpdateAccount => {
    return {
        type: ACTION_UPDATE_ACCOUNT,id, adding
    }
}

export const processActionUpdateAccount = (store: IStore, action: ActionUpdateAccount) : IStore => {
    const addingAccount = action.adding;
    const editAccountId = action.id;
    const location = LOCATION_EDIT_ACCOUNT;

    return {...store, addingAccount, editAccountId, location}
}
