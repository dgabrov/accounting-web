import React from "react";
import {CdCompanyProps, CdCompanyPropsData, CdCompanyPropsDispatch} from "./props/cd-company-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_COMPANIES} from "../state/constants";
import {deleteCompanyEffect} from "../oper/effect/delete-company-effect";
import {IdMap} from "../util/tp";

const CdCompanies = (props: CdCompanyProps) => {

    const confirm = () => {
        const ids = props.companies.map((company) => (company.id));
        props.confirm(ids);
    }

    const cancel = () => {
        props.cancel();
    }

    const names = props.companies.map((company) => {
        const id = company.id;
        const name = company.name;

        return (<li key={id}>{name}</li>);
    });

    return (
        <div className="container">
            <h1>Confirm delete the following companies</h1>
            <h4 className="light">The companies must have no accounts or transactions</h4>

            <ul>{names}</ul>

            <div className="edit">
                <button className="button" onClick={confirm}>Delete</button>
                <button className="button cancel" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}

const storeToProps = (store: IStore) : CdCompanyPropsData => {
    const idsObject = store.cdCompanyIds.reduce((acc: IdMap, id) => {
        acc[id] = '';
        return acc;
    }, {});

    const companies = store.companies.filter((company) => {
        const crtId = company.id;
        return idsObject.hasOwnProperty(crtId);
    });

    return {companies}
}

const dispatch = (dispatch : any) : CdCompanyPropsDispatch => {
    return {
        confirm: (ids: string[]) => {
            dispatch(deleteCompanyEffect(ids));
        },
        cancel: () => {
            dispatch(createActionLocation(LOCATION_COMPANIES));
        }
    }
}

export default connect(storeToProps, dispatch)(CdCompanies);
