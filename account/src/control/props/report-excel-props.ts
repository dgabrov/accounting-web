import {CompanyData} from "../../data/company-data";

export interface ReportExcelPropsData {
    company: CompanyData
}

export interface ReportExcelPropsDispatch {
    triggerReport : (start: string, end: string, companyId: string) => void;
}

export interface ReportExcelProps extends ReportExcelPropsData, ReportExcelPropsDispatch{
}
