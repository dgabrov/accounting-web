import {Action} from "redux";
import {IStore} from "../../state/store";

export const ACTION_TRIM : string = "ACTION_TRIM";

export interface ActionTrim extends Action<String> {
    type: string;
}

export const createActionTrim = (): ActionTrim => {
    return {
        type: ACTION_TRIM
    }
}

export const processActionTrim = (store: IStore, action: ActionTrim) : IStore => {
    // get the transactions
    // if transactions does not have more than one item, leave it alone, otherwise trim all but the last item
    let txns = store.transactions;
    txns = txns == null ? [] : txns;
    const length = txns.length

    const transactions = txns.filter((item, index) => {
        return index >= length - 1;
    })

    return {...store, transactions}
}
