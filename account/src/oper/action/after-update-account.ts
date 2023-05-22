import {Action} from "redux";
import {IStore} from "../../state/store";
import {AccountData} from "../../data/account-data";
import {LOCATION_ACCOUNTS} from "../../state/constants";

export const ACTION_AFTER_UPDATE_ACCOUNT : string = "ACTION_AFTER_UPDATE_ACCOUNT";

export interface ActionAfterUpdateAccount extends Action<String> {
    type: string;
    adding: boolean;
    data: AccountData;
}

export const createActionAfterUpdateAccount = (adding: boolean, data: AccountData): ActionAfterUpdateAccount => {
    return {
        type: ACTION_AFTER_UPDATE_ACCOUNT,
        adding,
        data
    }
}

export const processActionAfterUpdateAccount = (store: IStore, action: ActionAfterUpdateAccount) : IStore => {
    // depending on adding or updating, add or update to the collection of accounts
    const adding = action.adding;
    const data = action.data;
    const location = LOCATION_ACCOUNTS;

    let accounts = store.accounts;
    if (adding) {
        accounts = [...accounts, data];
    } else {
        const id = data.accountId;

        accounts = accounts.map((account) => {
            const currentId = account.accountId;
            let res: AccountData;
            if (currentId === id) {
                res = {...data};
            } else {
                res = account;
            }
            return res;
        });
    }

    // then reassemble the store with the new values
    return {...store, accounts, location}
}
