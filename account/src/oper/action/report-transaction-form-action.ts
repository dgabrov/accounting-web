import {Action} from "redux";
import {IStore} from "../../state/store";
import {ReportTransactionFormData} from "../../data/form-data";

export const ACTION_REPORT_TRANSACTION_FORM : string = "ACTION_REPORT_TRANSACTION_FORM";

export interface ActionReportTransactionForm extends Action<String> {
    type: string;
    form: ReportTransactionFormData
}

export const createActionReportTransactionForm = (form: ReportTransactionFormData): ActionReportTransactionForm => {
    return {
        type: ACTION_REPORT_TRANSACTION_FORM,
        form
    }
}

export const processActionReportTransactionForm = (store: IStore, action: ActionReportTransactionForm) : IStore => {
    const reportTransactionForm = action.form;

    return {...store, reportTransactionForm};
}
