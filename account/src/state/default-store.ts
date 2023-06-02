import {IStore} from "./store";
import {LOCATION_LOGIN} from "./constants";

export const createEmptyStore = (): IStore => {
    return {
        location: LOCATION_LOGIN,
        message: {
            visible : false,
            error: false,
            message: ''
        },
        user: null,
        company: null,
        allCompanyAccounts: [],
        companies: [],
        accounts: [],
        cdCompanyIds: [],
        cdAccountIds: [],
        cdTransactionIds: [],
        transactions: [],
        editCompanyId: '',
        addingCompany: true,

        editAccountId: '',
        addingAccount: true,

        editTransactionId: '',
        addingTransaction:  true,
        accountTypes: []
    }
}

