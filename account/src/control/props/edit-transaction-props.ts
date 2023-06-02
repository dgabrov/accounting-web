import {TransactionData} from "../../data/transaction-data";
import {AccountData} from "../../data/account-data";

export interface EditTransactionPropsData {
    transaction: TransactionData;
    adding: boolean;
    companyId: string;
    allCompanyAccounts: AccountData[];
}

export interface EditTransactionPropsDispatch {
    cancel: () => void;
    save: (adding: boolean, data: TransactionData) => void;
    getGuid: () => string;
    reportError: (err: string) => void;
}

export interface EditTransactionProps extends EditTransactionPropsData, EditTransactionPropsDispatch {}