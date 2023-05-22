import {Action} from "redux";
import {IStore} from "../../state/store";
import {TransactionData} from "../../data/transaction-data";
import {LOCATION_TRANSACTIONS} from "../../state/constants";

export const ACTION_AFTER_UPDATE_TRANSACTION : string = "ACTION_AFTER_UPDATE_TRANSACTION";

export interface ActionAfterUpdateTransaction extends Action<String> {
    type: string;
    adding: boolean;
    data: TransactionData;
}

export const createActionAfterUpdateTransaction = (adding: boolean, data: TransactionData): ActionAfterUpdateTransaction => {
    return {
        type: ACTION_AFTER_UPDATE_TRANSACTION,
        adding, data
    }
}

export const processActionAfterUpdateTransaction = (store: IStore, action: ActionAfterUpdateTransaction) : IStore => {
    let transactions = store.transactions;

    const adding = action.adding;
    const data = action.data;

    if (adding) {
        transactions = [...transactions, data];
    } else {
        const id = data.transactionId;
        transactions = transactions.map((txn) => {
            const currentId = txn.transactionId;
            let res : TransactionData;

            if (currentId === id) {
                res = {...data}
            } else {
                res = txn;
            }

            return res;
        })
    }

    const location = LOCATION_TRANSACTIONS;

    return {...store, location, transactions};
}
