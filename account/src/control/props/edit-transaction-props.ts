import {TransactionData} from "../../data/transaction-data";

export interface EditTransactionPropsData {
    transaction: TransactionData;
    adding: boolean;
    companyId: string;
}

export interface EditTransactionPropsDispatch {
    cancel: () => void;
    save: (adding: boolean, data: TransactionData) => void;
    getGuid: () => string;
    reportError: (err: string) => void;
}

export interface EditTransactionProps extends EditTransactionPropsData, EditTransactionPropsDispatch {}