import {v4} from "uuid";
import {LoginData} from "../data/login-data";
import {UserData} from "../data/user-data";
import {CompanyData} from "../data/company-data";
import {AccountData} from "../data/account-data";
import {AccountTypeData} from "../data/account-type-data";
import {TransactionData} from "../data/transaction-data";
import {proceedFetch} from "./goFetch";
import {setToken} from "./token";

let starterSequence = 0
const SEQUENCE_DELTA = 5;


export const getNewSequence = () => {
    starterSequence += SEQUENCE_DELTA;
    return starterSequence;
}

export const newGUID = (): string => {
    return v4();
}

export const loginUser = async (data: LoginData): Promise<UserData> => {
    const payload = JSON.stringify(data)
    const val = await proceedFetch(`/login`, payload, true, false)
    const userData : UserData = val as UserData

    setToken(userData.token)

    return userData
}

export const getCompanies = async (): Promise<CompanyData[]> => {
    return await proceedFetch('/companies', '', false, true)
}

export const updateCompany = async (adding: boolean, company: CompanyData) => {
    const payload = {adding, company}
    const strPayload = JSON.stringify(payload)

    await proceedFetch('/company', strPayload, true, true)
}

export const deleteCompanies = async (ids: string[]) => {
    const payload = {ids}
    const strPayload = JSON.stringify(payload)

    await proceedFetch('/deleteCompanies', strPayload, true, true)
}

export const doSearchAccounts = async (companyId: string, search: string): Promise<AccountData[]> => {
    const payload = {companyId, search}
    const strPayload = JSON.stringify(payload)

    const val = await proceedFetch('/searchAccounts', strPayload, true, true)

    return val.accounts
}

export const updateAccount = async (adding: boolean, account: AccountData) => {
    const payload = {adding, account}
    const strPayload = JSON.stringify(payload)

    await proceedFetch('/updateAccount', strPayload, true, true)
}

export const deleteAccounts = async (ids: string[]) => {
    const payload = {ids}
    const strPayload = JSON.stringify(payload)

    await proceedFetch('/deleteAccounts', strPayload, true, true)
}

export const fetchAccountTypes = async (): Promise<AccountTypeData[]> => {
    return await proceedFetch('/accountType', '', false, true)
}

export const deleteTransactions = async(ids: string[]) => {
    const payload = {ids}
    const strPayload = JSON.stringify(payload)

    await proceedFetch('/deleteTransactions', strPayload, true, true)
}

export const updateTransaction = async(adding: boolean, transaction: TransactionData) =>{
    const payload = {adding, transaction}
    const strPayload = JSON.stringify(payload)

    await proceedFetch("/updateTransaction", strPayload, true, true)
}

export const searchTransactions = async (companyId: string, search: string) : Promise<TransactionData[]> => {
    const payload = {companyId, search}
    const strPayload = JSON.stringify(payload)

    const val = await proceedFetch("/searchTransactions", strPayload, true, true)
    return val.transactions
}

export const loadAccounts = async (companyId: string) : Promise<AccountData []> => {
    const url = `/loadAccounts/${companyId}`
    const val = await proceedFetch(url, '', false, true)

    return val.accounts
}