import {Action} from "redux";
import {IStore} from "../../state/store";
import {TransactionData} from "../../data/transaction-data";

export const ACTION_TXN_SEARCH : string = "ACTION_TXN_SEARCH";

export interface ActionTxnSearch extends Action<String> {
    type: string;
    transactions: TransactionData[]
}

export const createActionTxnSearch = (transactions: TransactionData[]): ActionTxnSearch => {
    return {
        type: ACTION_TXN_SEARCH,
        transactions
    }
}

export const processActionTxnSearch = (store: IStore, action: ActionTxnSearch) : IStore => {
    const transactions = action.transactions;

    return {...store, transactions};
}
