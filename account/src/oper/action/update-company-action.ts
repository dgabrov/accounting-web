import {Action} from "redux";
import {IStore} from "../../state/store";
import {CompanyData} from "../../data/company-data";

export const ACTION_UPDATE_COMPANY : string = "update_company";

export interface ActionUpdateCompany extends Action<String> {
    type: string;
    adding: boolean;
    data: CompanyData
}

export const createActionUpdateCompany = (adding: boolean, data: CompanyData): ActionUpdateCompany => {
    return {
        type: ACTION_UPDATE_COMPANY,
        adding,
        data
    }
}

export const processActionUpdateCompany = (store: IStore, action: ActionUpdateCompany) : IStore => {
    const adding = action.adding;
    const data = action.data;
    const id = data.id;

    let companies = store.companies;
    if (adding) {
        companies.push(data);

        companies = [...companies];
    } else {
        companies = companies.map((currentCompany) => {
            const currentId = currentCompany.id;

            let res : CompanyData;

            if (currentId === id) {
                res = {...data}
            } else {
                res = currentCompany;
            }

            return res;
        })
    }

    return {...store, companies};
}
