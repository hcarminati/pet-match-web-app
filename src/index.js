import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./Components/store";
import {Provider} from "react-redux";
import {CurrentUser} from "./Components/user/currentUser";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <CurrentUser>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </CurrentUser>
    </Provider>
);
