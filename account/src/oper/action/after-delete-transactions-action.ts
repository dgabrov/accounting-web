import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_TRANSACTIONS} from "../../state/constants";
import {getIdMap, IdMap} from "../../util/tp";

export const ACTION_AFTER_DELETE_TRANSACTIONS : string = "ACTION_AFTER_DELETE_TRANSACTIONS";

export interface ActionAfterDeleteTransactions extends Action<String> {
    type: string;
    ids: string[]
}

export const createActionAfterDeleteTransactions = (ids: string[]): ActionAfterDeleteTransactions => {
    return {
        type: ACTION_AFTER_DELETE_TRANSACTIONS,
        ids
    }
}

export const processActionAfterDeleteTransactions = (store: IStore, action: ActionAfterDeleteTransactions) : IStore => {
    const ids = action.ids;
    const idMap: IdMap = getIdMap(ids);

    const location = LOCATION_TRANSACTIONS;

    // now remove the transactions from the store
    const transactions = store.transactions.filter((txn) => (!idMap.hasOwnProperty(txn.transactionId)));

    return {...store, transactions, location};
}
