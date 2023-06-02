import {CompanyData} from "../../data/company-data";

export interface ReportsPropsData {
    company: CompanyData | null
}

export interface ReportsPropsDispatch {
    trialBalance : () => void
    reportAccount: () => void
}

export interface ReportsProps extends ReportsPropsData, ReportsPropsDispatch {}