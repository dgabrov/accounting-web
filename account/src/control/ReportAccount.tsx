import React, {useEffect, useState} from 'react';
import {ReportAccountProps, ReportAccountPropsData, ReportAccountPropsDispatch} from "./props/report-account-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import AsyncSelect from "react-select/async";
import {AllMap, DropDownItemType} from "../util/tp";
import {SingleValue} from "react-select";
import {accountReport} from "../service/service";
import {AccountReportRequest, AccountReportResult} from "../data/account-report-data";
import {createActionMessage} from "../oper/action/message-action";
import {renderAccountReport} from "./report-account-aux";
import {AccountTypeData} from "../data/account-type-data";

const ReportAccount = (props: ReportAccountProps) => {

    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [defaultOptions, setDefaultOptions] = useState<DropDownItemType[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<DropDownItemType>({value: '', label: ''});
    const [result, setResult] = useState<AccountReportResult | null>(null)
    const [accountTypeMap, setAccountTypeMap] = useState<AllMap<AccountTypeData>>({})

    useEffect(() => {
        const newDefaultOptions = props.accounts.map((account) => {
            return {
                value: account.accountId,
                label: `${account.code} - ${account.name}`
            }
        })

        setDefaultOptions(newDefaultOptions);

        // account type map
        const newMap = props.accountTypes.reduce<AllMap<AccountTypeData>>((acc, current) => {
            acc[current.accountTypeCd] = current;
            return acc;
        }, {})
        setAccountTypeMap(newMap)

    }, [props.accounts, props.accountTypes])


    const runReport = async () => {
        try {
            const accountId = selectedAccountId.value
            const request: AccountReportRequest = {start, end, accountId}
            const res = await accountReport(request)
            setResult(res)
        } catch (err: any) {
            props.dispatchError(err)
        }
    }

    const startChange = (event: any) => {
        setStart(event.target.value);
    }

    const endChange = (event: any) => {
        setEnd(event.target.value)
    }

    const selectType = (newValue: SingleValue<DropDownItemType>) => {
        const res = {value: '', label: ''}
        if (newValue !== null) {
            res.value = newValue.value
            res.label = newValue.label
        }

        setSelectedAccountId(res);
    }

    const filterAccounts = async (input: string): Promise<DropDownItemType[]> => {
        const lower = input.toLowerCase()

        const result = props.accounts.filter((account) => {
            const key = `${account.code}|${account.name}`;

            return key.includes(lower);
        }).map<DropDownItemType>((account) => {
            return {
                value: account.accountId,
                label: `${account.code} - ${account.name}`
            }
        });

        return result;
    }

    const renderedResponse = renderAccountReport(result, accountTypeMap);

    // get account type

    return (
        <div className={'content'}>
            <h2 className={'header'}>Report Account {props.companyName}</h2>
            <div className="header edit bottom nowrap">
                    Start:<input type={"text"} onChange={startChange} value={start} style={{maxWidth: '100px'}}/>
                    End:<input type={"text"} onChange={endChange} value={end} style={{maxWidth: '100px'}}/>
                    Account: <AsyncSelect
                    loadOptions={filterAccounts}
                    onChange={selectType}
                    isClearable={true}
                    value={selectedAccountId}
                    defaultOptions={defaultOptions}
                    className={'minimumWidth'} />

                    <button className="button ok" onClick={runReport}>Generate</button>
            </div>

            {renderedResponse}
        </div>
    )
}

const storeToProps = (store: IStore): ReportAccountPropsData => {
    return {
        accounts: store.allCompanyAccounts,
        companyName: store.company!!.name,
        accountTypes: store.accountTypes
    }
}

const dispatch = (dispatch: any): ReportAccountPropsDispatch => {
    return {
        dispatchError: (err: any) => {
            dispatch(createActionMessage(true, true, err.message));
        }
    }
}

export default connect(storeToProps, dispatch)(ReportAccount);
