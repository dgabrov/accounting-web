import {CompanyData} from "../../data/company-data";

export interface EditCompanyPropsData {
    adding: boolean;
    company: CompanyData;
}

export interface EditCompanyPropsDispatch {
    save: (adding: boolean, data: CompanyData) => void;
    cancel: () => void;
}

export interface EditCompanyProps extends EditCompanyPropsData, EditCompanyPropsDispatch {}
