import React, {useEffect, useState} from "react";
import {AccountsProps, AccountsPropsData, AccountsPropsDispatch} from "./props/accounts-props";
import {IStore} from "../state/store";
import {AccountData} from "../data/account-data";
import {connect} from "react-redux";
import {searchAccountsEffect} from "../oper/effect/search-account-effect";
import {createActionDeleteAccounts} from "../oper/action/delete-accounts-action";
import {createActionMessage} from "../oper/action/message-action";
import {newGUID} from "../service/service";
import {updateAccountEffect} from "../oper/effect/update-account-effect";
import {IdMap} from "../util/tp";
import {processKeyDown} from "../util/key-operations";

const Accounts = (props: AccountsProps) => {

    const starter : {[p: string] : string} = {}
    const typeMap = props.accountTypes.reduce((acc, t) => {
        acc[t.accountTypeCd] = t.name;

        return acc;
    }, starter)

    let searchField : any | null = null;

    const updateSearchField = (newField : any) => {
        searchField = newField;
    }

    useEffect(() => {
        if (searchField !== null && searchField.focus) {
            searchField.focus();
            searchField.select();

        }
    }, [searchField])

    const sel: IdMap = {}

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(sel);

    // when accounts are changed, proceed to turn off any selection
    useEffect(() => {
        setSelected({});
    }, [props.accounts])

    const selectChange = (id: string) => {
        return () => {
            const newSelect = {...selected};

            if (newSelect.hasOwnProperty(id)) {
                delete newSelect[id];
            } else {
                newSelect[id] = "";
            }

            setSelected(newSelect);
        }
    }

    const edit = (data: AccountData) => {
        return (event: any) => {
            event.preventDefault();
            event.stopPropagation();

            props.edit(data);
        }
    }

    const accounts = props.accounts.map((account: AccountData, index: number) => {
        const nrCrt = index + 1;
        const id = account.accountId;
        const checked = selected.hasOwnProperty(id);
        const typeName = typeMap[account.accountTypeCd]

        return (
            <tr key={id}>
                <td>{nrCrt}</td>
                <td><input type="checkbox" checked={checked} onChange={selectChange(id)}/></td>
                <td><a href="/" onClick={edit(account)}>Edit</a></td>
                <td>{typeName}</td>
                <td>{account.code}</td>
                <td>{account.name}</td>
            </tr>
        );
    })

    const changeSearch = (event: any) => {
        const value = event.target.value;
        setSearch(value);
    }

    const doSearch = () => {
        props.doSearch(props.companyId, search);
    }

    const add = () => {
        props.add();
    }

    const triggerDelete = () => {
        const ids = Object.keys(selected);
        props.delete(ids);
    }

    return (
        <div className="content">
            <h1>Accounts</h1>
            <div className="header edit bottom">
                Search:
                <input type="text" value={search} onChange={changeSearch} ref={updateSearchField} onKeyDown={processKeyDown(doSearch, null, false)}/>
                <button className="button" onClick={doSearch}>Search</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>&nbsp;</td>
                    <td>Edit</td>
                    <td>Type</td>
                    <td>Code</td>
                    <td>Name</td>
                </tr>
                </thead>
                <tbody>
                {accounts}
                </tbody>
            </table>
            <div className="edit">
                <button className="button" onClick={add}>Add</button>
                <button className="button" onClick={triggerDelete}>Delete</button>
            </div>
        </div>
    );
}

const storeToProps = (store: IStore): AccountsPropsData => {
    const accounts = store.accounts;
    const companyId = '' + store.company?.id
    const accountTypes = store.accountTypes;

    return {accounts, companyId, accountTypes};
}

const dispatch = (dispatch: any): AccountsPropsDispatch => {
    return {
        edit: (data: AccountData) => {
            const id = data.accountId;
            dispatch(updateAccountEffect(id, false));
        },
        add: () => {
            dispatch(updateAccountEffect(newGUID(), true));
        },
        delete: (ids: string[]) => {
            if (ids.length > 0) {
                dispatch(createActionDeleteAccounts(ids));
            } else {
                dispatch(createActionMessage(true, true, "Please select at least one account to delete"));
            }
        },
        doSearch: (companyId: string ,search: string) => {
            dispatch(searchAccountsEffect(companyId, search));
        }
    }
}

export default connect(storeToProps, dispatch)(Accounts);

