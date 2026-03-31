import {Action} from "redux";
import {IStore} from "../../state/store";
import {AccountsFormData} from "../../data/form-data";

export const ACTION_UPDATE_ACCOUNTS_FORM : string = "ACTION_UPDATE_ACCOUNTS_FORM";

export interface ActionUpdateAccountsForm extends Action<String> {
    type: string;
    form: AccountsFormData
}

export const createActionUpdateAccountsForm = (form: AccountsFormData): ActionUpdateAccountsForm => {
    return {
        type: ACTION_UPDATE_ACCOUNTS_FORM,
        form
    }
}

export const processActionUpdateAccountsForm = (store: IStore, action: ActionUpdateAccountsForm) : IStore => {
    const accountsForm = action.form

    return {...store, accountsForm};
}
