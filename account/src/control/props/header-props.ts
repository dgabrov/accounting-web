import {UserData} from "../../data/user-data";
import {CompanyData} from "../../data/company-data";

export interface HeaderPropsDispatch {
    reports: () => void;
    logout: () => void;
    companies: () => void;
    transactions: () => void;
    accounts: () => void;
}

export interface HeaderPropsData {
    user: UserData | null;
    company: CompanyData | null;
}

export interface HeaderProps extends HeaderPropsDispatch, HeaderPropsData {}
