import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_CD_TRANSACTIONS} from "../../state/constants";

export const ACTION_CD_TRANSACTIONS : string = "ACTION_CD_TRANSACTIONS";

export interface ActionCdTransactions extends Action<String> {
    type: string;
    ids: string[];
}

export const createActionCdTransactions = (ids: string[]): ActionCdTransactions => {
    return {
        type: ACTION_CD_TRANSACTIONS,
        ids
    }
}

export const processActionCdTransactions = (store: IStore, action: ActionCdTransactions) : IStore => {
    const location = LOCATION_CD_TRANSACTIONS;
    const cdTransactionIds = action.ids;

    return {...store, location, cdTransactionIds}
}
