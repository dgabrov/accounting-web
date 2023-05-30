import React, {useState} from 'react';
import {ReportBalanceProps, ReportBalancePropsData, ReportBalancePropsDispatch} from "./props/report-balance-props";
import {connect} from "react-redux";
import {IStore} from "../state/store";
import {createActionMessage} from "../oper/action/message-action";
import {trialBalance} from "../service/service";
import {TrialBalanceRequest, TrialBalanceResponse} from "../data/trial-balance-data";
import {renderResponse} from "./report-balance";
import {AccountTypeData} from "../data/account-type-data";


const ReportBalance = (props: ReportBalanceProps) => {
    const companyName = props.company?.name
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [result, setResult] = useState<TrialBalanceResponse|null>(null)

    const startChange = (event : any) => {
        setStart(event.target.value)
    }

    const endChange = (event: any) => {
        setEnd(event.target.value)
    }

    const runReport = async() => {
        try {
            const companyId = props.company!!.id
            const request:  TrialBalanceRequest = {
                start, end, companyId
            }
            const res = await trialBalance(request)
            setResult(res)
        } catch(err: any) {
            props.dispatchError(err)
        }
    }

    const renderedResponse = renderResponse(props.company, start, end, result, props.accountTypeMap)

    return(<div className={'content '}>
        <h2>Trial Balance {companyName}</h2>
        <div className="header edit bottom" style={{width: '400px'}}>
            Start:<input type={"text"} onChange={startChange} value={start}/>
            End:<input type={"text"} onChange={endChange} value={end}/>
            <button className="button" onClick={runReport}>Generate</button>
        </div>

        {renderedResponse}
    </div>)
}

function storeToProps(store: IStore) : ReportBalancePropsData {
    const types = store.accountTypes
    const accountMap : {[p: string] : AccountTypeData} = types.reduce((acc : {[p:string] : AccountTypeData}, val) => {
        acc[val.accountTypeCd] = val
        return acc
    }, {})


    return {
        company: store.company,
        accountTypeMap: accountMap
    }
}

function dispatch(dispatch: any) : ReportBalancePropsDispatch {
    return {
        dispatchError : (err: any) => {
            let msg = ''

            if (err.message) {
                msg = err.message
            } else {
                msg = '' + err
            }

            dispatch(createActionMessage(true, true, msg));
        }
    }
}

export default connect(storeToProps, dispatch)(ReportBalance);
