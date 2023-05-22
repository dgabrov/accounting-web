import {Action} from "redux";
import {IStore} from "../../state/store";
import {AccountTypeData} from "../../data/account-type-data";

export const ACTION_ACCOUNT_TYPES : string = "ACTION_ACCOUNT_TYPES";

export interface ActionAccountTypes extends Action<String> {
    type: string;
    accountTypes: AccountTypeData[]
}

export const createActionAccountTypes = (accountTypes: AccountTypeData[]): ActionAccountTypes => {
    return {
        type: ACTION_ACCOUNT_TYPES,
        accountTypes
    }
}

export const processActionAccountTypes = (store: IStore, action: ActionAccountTypes) : IStore => {
    const accountTypes = action.accountTypes;
    return {...store, accountTypes};
}
