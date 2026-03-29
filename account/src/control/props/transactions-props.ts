import {TransactionData} from "../../data/transaction-data";
import {AccountData} from "../../data/account-data";
import {TransactionsFormData} from "../../data/form-data";
import Transactions from "../Transactions";

export interface TransactionsPropsData {
    search: string;
    transactions: TransactionData[];
    companyId : string;
    allCompanyAccounts: AccountData[];
    transactionsForm: TransactionsFormData;
}

export interface TransactionsPropsDispatch {
    add : () => void;
    delete: (ids: string[]) => void;
    edit: (data: TransactionData) => void;
    doSearch: (companyId: string, src: string) => void;
    trim: () => void;
    updateFormData: (form: TransactionsFormData) => void;
}

export interface TransactionsProps extends TransactionsPropsData, TransactionsPropsDispatch {}