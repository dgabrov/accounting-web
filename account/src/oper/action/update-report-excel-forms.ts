import {Action} from "redux";
import {IStore} from "../../state/store";
import {ReportExcelFormData} from "../../data/form-data";

export const ACTION_UPDATE_REPORT_EXCEL_FORMS : string = "ACTION_UPDATE_REPORT_EXCEL_FORMS";

export interface ActionUpdateReportExcelForms extends Action<String> {
    type: string;
    form: ReportExcelFormData;
}

export const createUpdateReportExcelFormsAction = (form: ReportExcelFormData): ActionUpdateReportExcelForms => {
    return {
        type: ACTION_UPDATE_REPORT_EXCEL_FORMS,
        form
    }
}

export const processActionUpdateReportExcelForms = (store: IStore, action: ActionUpdateReportExcelForms) : IStore => {
    const reportExcelForm = action.form;

    return {...store, reportExcelForm};
}
