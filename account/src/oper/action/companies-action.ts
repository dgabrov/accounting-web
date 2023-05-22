import {Action} from "redux";
import {IStore} from "../../state/store";
import {CompanyData} from "../../data/company-data";

export const ACTION_COMPANIES : string = "companies";

export interface ActionCompanies extends Action<String> {
    type: string;
    companies: CompanyData[]
}

export const createActionCompanies = (companies: CompanyData[]): ActionCompanies => {
    return {
        type: ACTION_COMPANIES,
        companies
    }
}

export const processActionCompanies = (store: IStore, action: ActionCompanies) : IStore => {
    const companies = action.companies;

    return {...store, companies}
}
