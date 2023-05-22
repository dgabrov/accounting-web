import React, {useEffect, useState} from 'react';
import {LoginProps, LoginPropsData, LoginPropsDispatch} from "./props/login-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {loginEffect} from "../oper/effect/login-effect";
import {processKeyDown} from "../util/key-operations";

const Login = (props: LoginProps) => {

    let loginField : any|null = null

    const updateLoginField = (newField: any) => {
        loginField = newField;
    }

    useEffect(() => {
        if (loginField !== null && loginField.focus) {
            loginField.focus();
            loginField.select();
        }
    }, [loginField])

    const [login, setLogin] = useState(props.login);
    const [password, setPassword] = useState('');

    const loginChange = (event: any) => {
        const crtValue = event?.target?.value;
        setLogin(crtValue);
    }

    const passwordChange = (event: any) => {
        const crtValue = event?.target?.value;
        setPassword(crtValue);
    }

    const triggerLogin = () => {
        props.proceed(login, password);
    }

    return (
        <div className="content">
            <div className="edit">Login</div>
            <div className="edit"><input type="text" value={login} onChange={loginChange} ref={updateLoginField} onKeyDown={processKeyDown(triggerLogin, null, false)}/></div>
            <div className="edit">Password</div>
            <div className="edit"><input type="password" value={password} onChange={passwordChange} onKeyDown={processKeyDown(triggerLogin, null, false)}/></div>
            <div className="edit">
                <button className="button" onClick={triggerLogin}>Proceed</button>
            </div>
        </div>
);
}

const storeToProps = (store: IStore): LoginPropsData => {
    return {
        login: '',
        password: ''
    };
}

const dispatch = (dispatch: any) : LoginPropsDispatch => {
    return {
        proceed(login: string, password: string) {
            dispatch(loginEffect({login, password}))
        },
    }
}

export default connect(storeToProps, dispatch)(Login);
