import {UserData} from "../data/user-data";
import {CompanyData} from "../data/company-data";
import {AccountData} from "../data/account-data";
import {TransactionData} from "../data/transaction-data";
import {AccountTypeData} from "../data/account-type-data";
import {ReportTransactionFormData, TransactionsFormData} from "../data/form-data";

export interface IStore {
    location: string;
    message : {
        visible: boolean;
        error: boolean;
        message: string;
    }
    user: UserData | null;
    company: CompanyData | null;
    allCompanyAccounts: AccountData[];
    companies: CompanyData[];
    accounts: AccountData[];
    cdCompanyIds: string[];
    cdAccountIds: string[];
    cdTransactionIds: string[];
    transactions: TransactionData[];
    editCompanyId: string;
    addingCompany: boolean;
    editAccountId: string;
    addingAccount: boolean;
    editTransactionId: string;
    addingTransaction: boolean;
    accountTypes: AccountTypeData[];

    transactionsForm: TransactionsFormData;
    reportTransactionForm: ReportTransactionFormData;
}

