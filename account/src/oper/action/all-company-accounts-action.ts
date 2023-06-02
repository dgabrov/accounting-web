import {Action} from "redux";
import {AccountData} from "../../data/account-data";
import {IStore} from "../../state/store";

export const ACTION_ALL_COMPANY_ACCOUNTS : string = "ACTION_ALL_COMPANY_ACCOUNTS";

export interface ActionAllCompanyAccounts extends Action<String> {
    type: string;
    allCompanyAccounts: AccountData[]
}

export const createActionAllCompanyAccounts = (allCompanyAccounts: AccountData[]): ActionAllCompanyAccounts => {
    return {
        type: ACTION_ALL_COMPANY_ACCOUNTS,
        allCompanyAccounts
    }
}

export const processActionAllCompanyAccounts = (store: IStore, action: ActionAllCompanyAccounts) : IStore => {
    const allCompanyAccounts = action.allCompanyAccounts;

    return {...store, allCompanyAccounts}
}
