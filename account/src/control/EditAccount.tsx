import React, {useEffect, useState} from "react";
import {EditAccountProps, EditAccountPropsData, EditAccountPropsDispatch} from "./props/edit-account-props";
import {IStore} from "../state/store";
import {AccountData} from "../data/account-data";
import {connect} from "react-redux";
import AsyncSelect from "react-select/async";
import {AccountTypeData} from "../data/account-type-data";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_ACCOUNTS} from "../state/constants";
import {createActionMessage} from "../oper/action/message-action";
import {updateAccount} from "../service/service";
import {createActionAfterUpdateAccount} from "../oper/action/after-update-account";
import {clearAccounts, getAllAccounts} from "../service/acct";
import {processKeyDown} from "../util/key-operations";


function getAccType(accountTypeCd: string, types: AccountTypeData[]) {
    let current = {label: "", value: ""};

    const filtered = types.filter((act) => {
        return act.accountTypeCd === accountTypeCd;
    }).map((act) => {
        return {value: act.accountTypeCd, label: act.name}
    });

    if (filtered?.length > 0) {
        current = filtered[0]
    }

    return current;
}

const EditAccount = (props: EditAccountProps) => {

    let typeDrop: any | null = null;

    const updateTypeDrop = (newField: any) => {
        typeDrop = newField
    }

    useEffect(() => {
        if (typeDrop != null && typeDrop.focus) {
            typeDrop.focus();
        }
    }, [typeDrop])

    const [code, setCode] = useState(props.data.code);
    const [name, setName] = useState(props.data.name);

    const accType: { value: string, label: string } = getAccType(props.data.accountTypeCd, props.accountTypes);
    const [accountType, setAccountType] = useState(accType);

    const selectType = (newValue: any) => {
        setAccountType(newValue);
    }

    const displayTypeCd = props.accountTypes.map((type) => {
        const value = type.accountTypeCd;
        const label = type.name;

        return {value, label};
    })

    const accountTypeOptions = async (input: string) => {
        const res = displayTypeCd.filter((tp) => {
            return tp.value.toLowerCase().includes(input.toLowerCase());
        });

        return res;
    }

    const save = () => {
        const acc = props.data;
        const account: AccountData = {
            accountId: acc.accountId,
            accountTypeCd: accountType.value,
            code,
            name,
            companyId: acc.companyId
        }

        props.save(account, props.adding);
    }

    const cancel = () => {
        props.cancel();
    };

    const fieldChange = (field: string) => {
        let res: (event: any) => void;

        if (field === 'code') {
            res = (event: any) => {
                const val = event.target.value;
                setCode(val);
            }
        } else {
            res = (event: any) => {
                const val = event.target.value;
                setName(val);
            }
        }

        return res;
    }

    const message = props.adding === true ? 'Add' : 'Edit';

    return (
        <div className="content">
            <h1>{message} Account</h1>
            <div className="region">
                <div className="item">
                    <div className="edit">Type</div>
                    <div className="edit">
                        <AsyncSelect
                            loadOptions={accountTypeOptions}
                            onChange={selectType}
                            isClearable={true}
                            value={accountType}
                            defaultOptions={displayTypeCd}
                            ref={updateTypeDrop}
                        />
                    </div>
                    <div className="edit">
                        <button className="button" onClick={save}>Save</button>
                        <button className="button" onClick={cancel}>Cancel</button>
                    </div>
                </div>
                <div className="item">
                    <div className="edit">Code</div>
                    <div className="edit">
                        <input type="text" value={code} onChange={fieldChange('code')}
                               onKeyDown={processKeyDown(save, cancel, false)}/>
                    </div>
                </div>
                <div className="item">
                    <div className="edit">Name</div>
                    <div className="edit">
                        <input type="text" value={name} onChange={fieldChange('name')}
                               onKeyDown={processKeyDown(save, cancel, false)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = (store: IStore): EditAccountPropsData => {
    const accountId = store.editAccountId;
    const adding = store.addingAccount;
    const companyId = store.company!!.id;

    let data: AccountData = {accountId, name: '', code: '', companyId, accountTypeCd: ''}
    if (!adding) {
        // then the account data is part of the value
        const accounts = store.accounts;
        const filtered = accounts.filter((acc) => (accountId === acc.accountId));

        if (filtered.length > 0) {
            data = filtered[0];
        }
    }

    const accountTypes = store.accountTypes

    return {adding, data, accountTypes};
}

const dispatch = (dispatch: any): EditAccountPropsDispatch => {
    return {
        cancel: () => {
            dispatch(createActionLocation(LOCATION_ACCOUNTS));
        },
        save: (data: AccountData, adding: boolean) => {
            dispatch(save(data, adding));
        }
    }
}

const saveEffect = async (dispatch: any, data: AccountData, adding: boolean) => {
    try {
        // update the account data
        await updateAccount(adding, data);

        // refresh the accounts loaded in cache
        clearAccounts();
        await getAllAccounts();

        // now with this, process after update account
        dispatch(createActionAfterUpdateAccount(adding, data));
    } catch (err: any) {
        dispatch(createActionMessage(true, true, err.message));
    }
}

const save = (data: AccountData, adding: boolean) => {
    return (dispatch: any) => {
        saveEffect(dispatch, data, adding).then(() => {
        })
    }
}

export default connect(storeToProps, dispatch)(EditAccount);
