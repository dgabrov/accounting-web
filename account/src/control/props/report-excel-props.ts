import {CompanyData} from "../../data/company-data";
import {ReportExcelFormData} from "../../data/form-data";

export interface ReportExcelPropsData {
    company: CompanyData
    form: ReportExcelFormData
}

export interface ReportExcelPropsDispatch {
    triggerReport : (start: string, end: string, companyId: string) => void;
    updateFormData: (start: string, end: string) => void;
}

export interface ReportExcelProps extends ReportExcelPropsData, ReportExcelPropsDispatch{
}
