import {CompanyData} from "../../data/company-data";

export interface CdCompanyPropsData {
    companies: CompanyData[];
}

export interface CdCompanyPropsDispatch {
    confirm: (ids: string[]) => void;
    cancel: () => void;
}

export interface CdCompanyProps extends CdCompanyPropsData, CdCompanyPropsDispatch{}
