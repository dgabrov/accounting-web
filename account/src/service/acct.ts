import {AccountData} from "../data/account-data";
import {loadAccounts} from "./service";
import {AllMap} from "../util/tp";

let accounts: AccountData[] = []
let accountMap: AllMap<AccountData> = {}
let loaded : boolean = false;

let companyId: string = '';

export const getAllAccounts = async () : Promise<AccountData[]> => {
    if (!loaded) {
        accounts = await loadAccounts(companyId);

        // prepare the map
        accountMap = {};
        accounts.forEach((acct) => {
            accountMap[acct.accountId] = acct;
        })

        loaded = true;
    }

    return accounts!!;
}

export const getAccountMap = async () : Promise<AllMap<AccountData>> => {
    await getAllAccounts();

    return accountMap;
}

export const clearAccounts = () => {
    accounts = [];
    accountMap = {};
    loaded = false
}

export const setCompanyId = (id: string) => {
    companyId = id;
    clearAccounts();
}