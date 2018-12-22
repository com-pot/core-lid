import { pushStateLocationPlugin } from "@uirouter/react";

import Layout from './layout/Layout';

import * as pages from './modules/pages';

export const states = [
    {
        name: 'app',
        component: Layout
    }
].concat(pages.states);

export const plugins = [
    pushStateLocationPlugin
];
