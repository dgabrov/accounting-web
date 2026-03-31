import {Action} from "redux";
import {IStore} from "../../state/store";
import {ReportAccountFormData} from "../../data/form-data";

export const ACTION_UPDATE_REPORT_ACCOUNT_FORM : string = "ACTION_UPDATE_REPORT_ACCOUNT_FORM";

export interface ActionUpdateReportAccountForm extends Action<String> {
    type: string;
    form: ReportAccountFormData
}

export const createActionUpdateReportAccount = (form: ReportAccountFormData): ActionUpdateReportAccountForm => {
    return {
        type: ACTION_UPDATE_REPORT_ACCOUNT_FORM,
        form
    }
}

export const processActionUpdateReportAccountForm = (store: IStore, action: ActionUpdateReportAccountForm) : IStore => {
    const reportAccountForm = action.form

    return {...store, reportAccountForm};
}
