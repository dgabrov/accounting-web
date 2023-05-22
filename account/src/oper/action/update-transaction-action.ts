import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_EDIT_TRANSACTION} from "../../state/constants";

export const ACTION_UPDATE_TRANSACTION : string = "ACTION_UPDATE_TRANSACTION";

export interface ActionUpdateTransaction extends Action<String> {
    type: string;
    adding: boolean;
    id: string;
}

export const createActionUpdateTransaction = (adding: boolean, id: string): ActionUpdateTransaction => {
    return {
        type: ACTION_UPDATE_TRANSACTION, adding, id
    }
}

export const processActionUpdateTransaction = (store: IStore, action: ActionUpdateTransaction) : IStore => {
    const addingTransaction = action.adding;
    const editTransactionId = action.id;
    const location = LOCATION_EDIT_TRANSACTION;

    return {...store, addingTransaction, editTransactionId, location};
}
