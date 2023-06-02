import {TransactionData} from "../../data/transaction-data";
import {AccountData} from "../../data/account-data";

export interface TransactionsPropsData {
    search: string;
    transactions: TransactionData[];
    companyId : string;
    allCompanyAccounts: AccountData[];
}

export interface TransactionsPropsDispatch {
    add : () => void;
    delete: (ids: string[]) => void;
    edit: (data: TransactionData) => void;
    doSearch: (companyId: string, src: string) => void;
}

export interface TransactionsProps extends TransactionsPropsData, TransactionsPropsDispatch {}