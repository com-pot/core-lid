import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView } from '@uirouter/react';

import * as serviceWorker from './serviceWorker';

import * as router from "./router";

ReactDOM.render(
    <UIRouter states={router.states} plugins={router.plugins} config={router.config}>
        <UIView />
    </UIRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
