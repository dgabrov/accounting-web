import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, PreloadedState} from "redux";
import {IStore} from "./state/store";
import {createEmptyStore} from "./state/default-store";
import thunk from "redux-thunk";
import reducer from "./state/reducer";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const initialStore: PreloadedState<IStore> = createEmptyStore();

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
