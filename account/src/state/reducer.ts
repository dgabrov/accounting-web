import {IStore} from "./store";
import {Action, Reducer} from "redux";
import {createEmptyStore} from "./default-store";
import {ACTION_MESSAGE, processActionMessage} from "../oper/action/message-action";
import {ACTION_LOGIN, processActionLogin} from "../oper/action/login-action";
import {ACTION_COMPANIES, processActionCompanies} from "../oper/action/companies-action";
import {ACTION_LOCATION, processActionLocation} from "../oper/action/location-action";
import {ACTION_EDIT_COMPANY, processActionEditCompany} from "../oper/action/edit-company-action";
import {ACTION_UPDATE_COMPANY, processActionUpdateCompany} from "../oper/action/update-company-action";
import {ACTION_CHOOSE_COMPANY, processActionChooseCompany} from "../oper/action/choose-company-action";
import {ACTION_DELETE_COMPANY, processActionDeleteCompany} from "../oper/action/delete-company-action";
import {
    ACTION_AFTER_DELETE_COMPANIES,
    processActionAfterDeleteCompanies
} from "../oper/action/after-delete-companies-action";
import {ACTION_CLEAR_STORE, processActionClearStore} from "../oper/action/clear-store-action";
import {ACTION_SEARCH_ACCOUNTS, processActionSearchAccounts} from "../oper/action/search-acounts";
import {ACTION_DELETE_ACCOUNTS, processActionDeleteAccounts} from "../oper/action/delete-accounts-action";
import {ACTION_UPDATE_ACCOUNT, processActionUpdateAccount} from "../oper/action/update-account-action";
import {ACTION_CD_TRANSACTIONS, processActionCdTransactions} from "../oper/action/cd-transactions_action";
import {
    ACTION_AFTER_DELETE_TRANSACTIONS,
    processActionAfterDeleteTransactions
} from "../oper/action/after-delete-transactions-action";
import {ACTION_AFTER_UPDATE_ACCOUNT, processActionAfterUpdateAccount} from "../oper/action/after-update-account";
import {
    ACTION_AFTER_DELETE_ACCOUNTS,
    processActionAfterDeleteAccounts
} from "../oper/action/after-delete-accounts-action";
import {
    ACTION_AFTER_UPDATE_TRANSACTION,
    processActionAfterUpdateTransaction
} from "../oper/action/after-update-transaction-action";
import {ACTION_TXN_SEARCH, processActionTxnSearch} from "../oper/action/txn-search-action";
import {ACTION_UPDATE_TRANSACTION, processActionUpdateTransaction} from "../oper/action/update-transaction-action";
import {ACTION_ACCOUNT_TYPES, processActionAccountTypes} from "../oper/action/action-account-types";
import {ACTION_ALL_COMPANY_ACCOUNTS, processActionAllCompanyAccounts} from "../oper/action/all-company-accounts-action";

const map: {[key: string]: (store: IStore, action: any) => IStore } = {}

map[ACTION_MESSAGE] = processActionMessage;
map[ACTION_LOGIN] = processActionLogin;
map[ACTION_COMPANIES] = processActionCompanies;
map[ACTION_LOCATION] = processActionLocation;
map[ACTION_EDIT_COMPANY] = processActionEditCompany;
map[ACTION_UPDATE_COMPANY] = processActionUpdateCompany;
map[ACTION_CHOOSE_COMPANY] = processActionChooseCompany;
map[ACTION_DELETE_COMPANY] = processActionDeleteCompany;
map[ACTION_AFTER_DELETE_COMPANIES] = processActionAfterDeleteCompanies;
map[ACTION_CLEAR_STORE] = processActionClearStore;
map[ACTION_SEARCH_ACCOUNTS] = processActionSearchAccounts;
map[ACTION_AFTER_DELETE_ACCOUNTS] = processActionAfterDeleteAccounts;
map[ACTION_DELETE_ACCOUNTS] = processActionDeleteAccounts;
map[ACTION_UPDATE_ACCOUNT] = processActionUpdateAccount;
map[ACTION_CD_TRANSACTIONS] = processActionCdTransactions;
map[ACTION_AFTER_DELETE_TRANSACTIONS] = processActionAfterDeleteTransactions;
map[ACTION_AFTER_UPDATE_ACCOUNT] = processActionAfterUpdateAccount;
map[ACTION_AFTER_UPDATE_TRANSACTION] = processActionAfterUpdateTransaction;
map[ACTION_TXN_SEARCH] = processActionTxnSearch;
map[ACTION_UPDATE_TRANSACTION] = processActionUpdateTransaction;
map[ACTION_ACCOUNT_TYPES] = processActionAccountTypes;
map[ACTION_ALL_COMPANY_ACCOUNTS] = processActionAllCompanyAccounts;

const emptyReducer = (store: IStore | undefined, action: Action<string>): IStore => {
    console.log(`cannot find reducer for the action with the type: ${action.type}`);

    return store || createEmptyStore();
}


const reducer : Reducer<IStore, Action> = (store: IStore | undefined, action: Action<string>): IStore => {
    const type : string = action.type;
    const notNullStore = store!!;

    let reducer: (store: IStore, action: Action<string>) => IStore = emptyReducer;

    if (map.hasOwnProperty(type)) {
        reducer = map[type];
    }

    return reducer(notNullStore, action);
}

export default reducer;
