import {TransactionData} from "../../data/transaction-data";
import {AccountData} from "../../data/account-data";

export interface CdTransactionPropsData {
    transactions: TransactionData[];
    companyId : string;
    allCompanyAccounts: AccountData[]
}

export interface CdTransactionPropsDispatch {
    confirm: (ids: string[]) => void
    cancel: () => void;
}

export interface CdTransactionProps extends CdTransactionPropsData, CdTransactionPropsDispatch {}
