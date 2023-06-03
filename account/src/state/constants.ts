export const LOCATION_LOGIN : string = 'login';
export const LOCATION_ACCOUNTS: string = 'accounts';
export const LOCATION_CD_ACCOUNTS: string = 'cd_accounts';
export const LOCATION_CD_COMPANIES: string = 'cd_companies';
export const LOCATION_CD_TRANSACTIONS: string = 'cd_transactions';
export const LOCATION_COMPANIES: string = 'companies';
export const LOCATION_EDIT_ACCOUNT: string = 'edit_account';
export const LOCATION_EDIT_COMPANY: string = 'edit_company';
export const LOCATION_EDIT_TRANSACTION: string = 'edit_transaction';
export const LOCATION_TRANSACTIONS: string = 'transactions';
export const LOCATION_REPORTS: string = 'reports';
export const LOCATION_REPORT_BALANCE : string = 'report_balance';
export const LOCATION_REPORT_ACCOUNT : string = 'report_account';
export const LOCATION_REPORT_TRANSACTION: string = 'report_transaction';

const MONTHS : {[p:number] : string} = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

export const getMonth = (month: number) : string => {
    let res = "not found";

    if (MONTHS.hasOwnProperty(month)) {
        res = MONTHS[month];
    }

    return res;
}