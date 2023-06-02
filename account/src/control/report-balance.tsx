import React from 'react'
import {TrialBalance, TrialBalanceResponse} from "../data/trial-balance-data";
import {CompanyData} from "../data/company-data";
import {AccountTypeData} from "../data/account-type-data";

const getHeader = (companyName: string, start: string, end: string) => {
    let periodMsg: string
    if (end.trim().length > 0) {
        periodMsg = "between " + start + " and " + end
    } else {
        periodMsg = "starting with " + start
    }

    return <h5>Trial Balance for {companyName} for the period {periodMsg}</h5>;
};

const getGroupRow = (name: string) => {
    return (
        <tr key={name}>
            <td className={'nowrap'} colSpan={8}>
                <div className="group-row">{name}</div>
            </td>
        </tr>
    )
}

const getRegularRow = (value: TrialBalance) => {
    const id = value.accountId
    const code = value.code
    const name = value.name
    const startDebit = value.startBalance.debit.toFixed(2)
    const startCredit = value.startBalance.credit.toFixed(2)
    const runDebit = value.runs.debit.toFixed(2)
    const runCredit = value.runs.credit.toFixed(2)
    const balanceDebit = value.endBalance.debit.toFixed(2)
    const balanceCredit = value.endBalance.credit.toFixed(2)

    return (
        <tr key={id}>
            <td className={'nowrap'}>{code}</td>
            <td className={'nowrap'}>{name}</td>
            <td className={'right'}>{startDebit}</td>
            <td className={'right'}>{startCredit}</td>
            <td className={'right'}>{runDebit}</td>
            <td className={'right'}>{runCredit}</td>
            <td className={'right'}>{balanceDebit}</td>
            <td className={'right'}>{balanceCredit}</td>
        </tr>
    )
}

const getTable = (values: TrialBalance[], totals: TrialBalance, accountTypeMap: {
    [p: string]: AccountTypeData
}): JSX.Element => {
    let currentAccountTypeCd = '';

    const rows = values.flatMap((value) => {
        const res: JSX.Element[] = []

        const typeCd = value.accountTypeCd
        if (currentAccountTypeCd !== typeCd) {
            currentAccountTypeCd = typeCd
            const accountTypeName = accountTypeMap[typeCd].name;

            const groupRow = getGroupRow(accountTypeName)
            res.push(groupRow)
        }

        const regularRow = getRegularRow(value);
        res.push(regularRow)

        return res
    })

    const total = <tr className={'right total'}>
        <td colSpan={2} className={'right'}>Totals:</td>
        <td>{totals.startBalance.debit.toFixed(2)}</td>
        <td>{totals.startBalance.credit.toFixed(2)}</td>
        <td>{totals.runs.debit.toFixed(2)}</td>
        <td>{totals.runs.credit.toFixed(2)}</td>
        <td>{totals.endBalance.debit.toFixed(2)}</td>
        <td>{totals.endBalance.credit.toFixed(2)}</td>
    </tr>


    return (<table className="table">
        <thead>
        <tr>
            <td rowSpan={2}>Code</td>
            <td rowSpan={2}>Name</td>
            <td colSpan={2} className={'center'}>Start Balance</td>
            <td colSpan={2} className={'center'}>Run</td>
            <td colSpan={2} className={'center'}>End Balance</td>
        </tr>
        <tr>
            <td className={'right'}>Debit</td>
            <td className={'right'}>Credit</td>
            <td className={'right'}>Debit</td>
            <td className={'right'}>Credit</td>
            <td className={'right'}>Debit</td>
            <td className={'right'}>Credit</td>
        </tr>
        </thead>
        <tbody>
        {rows}
        {total}
        </tbody>
    </table>)
};

const renderTable = (companyName: string, data: TrialBalanceResponse, accountTypeMap: {
    [p: string]: AccountTypeData
}): any => {
    const header = getHeader(companyName, data.start, data.end)
    const table = getTable(data.items, data.totals, accountTypeMap)

    return (
        <div>
            {header}
            {table}
        </div>
    )
}

export const renderResponse = (company: CompanyData | null, result: TrialBalanceResponse | null, accountTypeMap: {
    [p: string]: AccountTypeData
}): any => {
    let res = (<div></div>)

    if (result !== null) {
        res = renderTable(company!!.name, result, accountTypeMap);
    }


    return res;
}
