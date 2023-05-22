import {CompanyData} from "../../data/company-data";

export interface CompaniesPropsData {
    companies: CompanyData[]
}

export interface CompaniesPropsDispatch {
    edit: (id: string) => void
    add: () => void
    remove: (ids: string[]) => void
    choose: (data: CompanyData) => void
}

export interface CompaniesProps extends CompaniesPropsData, CompaniesPropsDispatch {}