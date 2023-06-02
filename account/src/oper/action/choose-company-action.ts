import {Action} from "redux";
import {IStore} from "../../state/store";
import {AccountData} from "../../data/account-data";
import {TransactionData} from "../../data/transaction-data";

export const ACTION_CHOOSE_COMPANY : string = "choose-company";

export interface ActionChooseCompany extends Action<String> {
    type: string;
    id: string
}

export const createActionChooseCompany = (id: string): ActionChooseCompany => {
    return {
        type: ACTION_CHOOSE_COMPANY,
        id
    }
}

export const processActionChooseCompany = (store: IStore, action: ActionChooseCompany) : IStore => {
    // attention, if the company is already the current one, forgeddabout doing anything
    let res = store
    const id = action.id;
    // not the same company, so change everything, and clear all the values for accounts etc
    if (store.company?.id !== id) {
        // get the newly selected company
        const company = store.companies.filter((c) => (c.id === id))[0];

        const accounts : AccountData[] = [];
        const transactions : TransactionData[] = [];

        res = { ...store, accounts, transactions, company }
    }

    return res;
}
