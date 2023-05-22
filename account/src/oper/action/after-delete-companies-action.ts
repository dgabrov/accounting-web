import {Action} from "redux";
import {IStore} from "../../state/store";
import {LOCATION_COMPANIES} from "../../state/constants";
import {IdMap} from "../../util/tp";

export const ACTION_AFTER_DELETE_COMPANIES : string = "ACTION_AFTER_DELETE_COMPANIES";

export interface ActionAfterDeleteCompanies extends Action<String> {
    type: string;
    ids: string[]
}

export const createActionAfterDeleteCompanies = (ids: string[]): ActionAfterDeleteCompanies => {
    return {
        type: ACTION_AFTER_DELETE_COMPANIES,
        ids
    }
}

export const processActionAfterDeleteCompanies = (store: IStore, action: ActionAfterDeleteCompanies) : IStore => {
    const ids = action.ids;
    const idMap = ids.reduce((acc: IdMap, id: string) => {
        acc[id] = "";
        return acc;
    }, {});

    const companies = store.companies.filter((c) => (!idMap.hasOwnProperty(c.id)));

    // OK, now if the id of the selected company is the selected one, remove transactions, remove accounts and remove the selected company
    let resStore: IStore;
    const selectedId: string|undefined = store.company?.id;

    if (selectedId && idMap.hasOwnProperty(selectedId)) {
        resStore = {...store, companies, company: null, accounts: [], transactions: [], location: LOCATION_COMPANIES}
    } else {
        resStore = {...store, companies, location: LOCATION_COMPANIES}
    }

    return resStore;

}
