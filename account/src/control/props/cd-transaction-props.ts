import {TransactionData} from "../../data/transaction-data";

export interface CdTransactionPropsData {
    transactions: TransactionData[];
    companyId : string;
}

export interface CdTransactionPropsDispatch {
    confirm: (ids: string[]) => void
    cancel: () => void;
}

export interface CdTransactionProps extends CdTransactionPropsData, CdTransactionPropsDispatch {}
