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

export const config = (router) => {
    router.urlRouter.otherwise((a,origin,router, d, e) => {
        router.stateService.go('app.404', {
            origin
        });
    });

    // todo: disable strict mode / trailing slash enforcement
};

