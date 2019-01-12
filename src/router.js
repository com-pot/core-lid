import {pushStateLocationPlugin} from "@uirouter/react";

import Layout from './layout/Layout';

import * as pages from './modules/pages';
import * as forum from './modules/forum';
import * as social from './modules/social';

export const states = [
        {name: 'app', component: Layout}
    ]
        .concat(pages.states)
        .concat(forum.states)
        .concat(social.states)
;

export const plugins = [
    pushStateLocationPlugin
];
