import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_ACCOUNTS} from "../../state/constants";
import {IdMap} from "../../util/tp";

export const ACTION_AFTER_DELETE_ACCOUNTS : string = "ACTION_AFTER_DELETE_ACCOUNTS";

export interface ActionAfterDeleteAccounts extends Action<String> {
    type: string;
    ids: string[]
}

export const createActionAfterDeleteAccounts = (ids: string[]): ActionAfterDeleteAccounts => {
    return {
        type: ACTION_AFTER_DELETE_ACCOUNTS,
        ids
    }
}

export const processActionAfterDeleteAccounts = (store: IStore, action: ActionAfterDeleteAccounts) : IStore => {
    const ids = action.ids;
    const idMap : IdMap = ids.reduce((acc: IdMap, id) => {
        acc[id] = "";
        return acc;
    }, {});

    const accounts = store.accounts.filter((account) => {
        const accountId = account.accountId;
        return !idMap.hasOwnProperty(accountId);
    });

    const location = LOCATION_ACCOUNTS;

    return {...store, accounts, location};
}
