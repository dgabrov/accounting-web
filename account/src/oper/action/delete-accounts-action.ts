import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_CD_ACCOUNTS} from "../../state/constants";

export const ACTION_DELETE_ACCOUNTS : string = "ACTION_DELETE_ACCOUNTS";

export interface ActionDeleteAccounts extends Action<String> {
    type: string;
    ids: string[]
}

export const createActionDeleteAccounts = (ids: string[]): ActionDeleteAccounts => {
    return {
        type: ACTION_DELETE_ACCOUNTS,
        ids
    }
}

export const processActionDeleteAccounts = (store: IStore, action: ActionDeleteAccounts) : IStore => {
    const cdAccountIds = action.ids;
    const location = LOCATION_CD_ACCOUNTS;

    return {...store, cdAccountIds, location};
}
