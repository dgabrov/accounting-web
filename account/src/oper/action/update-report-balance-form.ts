import {Action} from "redux";
import {IStore} from "../../state/store";
import {ReportBalanceFormData} from "../../data/form-data";

export const ACTION_UPDATE_REPORT_BALANCE_FORM : string = "ACTION_UPDATE_REPORT_BALANCE_FORM";

export interface ActionUpdateReportBalanceForm extends Action<String> {
    type: string;
    form: ReportBalanceFormData
}

export const createActionUpdateReportBalanceForm = (form: ReportBalanceFormData): ActionUpdateReportBalanceForm => {
    return {
        type: ACTION_UPDATE_REPORT_BALANCE_FORM,
        form
    }
}

export const processActionUpdateReportBalanceForm = (store: IStore, action: ActionUpdateReportBalanceForm) : IStore => {
    const reportBalanceForm = action.form

    return {...store, reportBalanceForm};
}
