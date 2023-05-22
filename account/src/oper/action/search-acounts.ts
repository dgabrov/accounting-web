import {Action} from "redux";
import {IStore} from "../../state/store";
import {AccountData} from "../../data/account-data";

export const ACTION_SEARCH_ACCOUNTS : string = "ACTION_SEARCH_ACCOUNTS";

export interface ActionSearchAccounts extends Action<String> {
    type: string;
    accounts: AccountData[]
}

export const createActionSearchAccounts = (accounts: AccountData[]): ActionSearchAccounts => {
    return {
        type: ACTION_SEARCH_ACCOUNTS,
        accounts
    }
}

export const processActionSearchAccounts = (store: IStore, action: ActionSearchAccounts) : IStore => {
    const accounts = action.accounts;

    return {...store, accounts}
}
