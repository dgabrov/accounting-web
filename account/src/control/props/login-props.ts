import {LoginData} from "../../data/login-data";

export interface LoginPropsData extends LoginData {}

export interface LoginPropsDispatch {
    proceed : (login: string, password: string) => void
}

export interface LoginProps extends LoginPropsData, LoginPropsDispatch {}
