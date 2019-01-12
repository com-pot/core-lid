import React from 'react';
import {UIView} from "@uirouter/react";

import TopicListing from "./states/TopicListing";
import TopicView from "./states/TopicView";

import {paginationResolve} from "../../services/paginationHelper";

export const states = [
    {name: 'app.forum', url: '/forum/', component: () => (<UIView/>), abstract: true},
    {
        name: 'app.forum.topicListing',
        url: '?page',
        component: TopicListing,
        resolve: {
            pagination: paginationResolve(2)
        }
    },
    {
        name: 'app.forum.topicView',
        url: 'topic/:topicId',
        component: TopicView,
        resolve: {
            topicId: ($transition$) => ($transition$.params().topicId),
        }
    },
];
