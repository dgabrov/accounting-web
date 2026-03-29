import {Action} from "redux";
import {IStore} from "../../state/store";
import {TransactionsFormData} from "../../data/form-data";

export const ACTION_UPDATE_TRANSACTIONS_FORM : string = "ACTION_UPDATE_TRANSACTIONS_FORM";

export interface ActionUpdateTransactionsForm extends Action<String> {
    type: string;
    form: TransactionsFormData
}

export const createActionUpdateTransactionsForm = (form: TransactionsFormData): ActionUpdateTransactionsForm => {
    return {
        type: ACTION_UPDATE_TRANSACTIONS_FORM,
        form
    }
}

export const processActionUpdateTransactionForm = (store: IStore, action: ActionUpdateTransactionsForm) : IStore => {
    const transactionsForm = action.form

    return {...store, transactionsForm};
}
