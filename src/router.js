import {pushStateLocationPlugin} from "@uirouter/react";

import Layout from './layout/Layout';

import * as pages from './modules/pages';
import * as forum from './modules/forum';

export const states = [
        {name: 'app', component: Layout}
    ]
        .concat(pages.states)
        .concat(forum.states)
;

export const plugins = [
    pushStateLocationPlugin
];
