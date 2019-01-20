import React from 'react';
import {UIView} from "@uirouter/react";

import {RouterHelper} from "../../services/routerHelper";

import TopicListing from "./states/TopicListing";
import TopicView from "./states/TopicView";
import TopicEdit from "./states/TopicEdit";

import {paginationResolve} from "../../services/paginationHelper";

import categories from "./services/categories"

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
        url: 'topic/:topicId/?page',
        component: TopicView,
        resolve: {
            topicId: RouterHelper.paramResolver("topicId"),
            page: RouterHelper.paramResolver('page'),
        },
    },
    {
        name: 'app.forum.createTopic',
        url: 'create-topic/',
        component: TopicEdit,
        resolve: {
            topicId: () => undefined,
            categories: () => categories.listPairs()
        },
    },
    {
        name: 'app.forum.editTopic',
        url: 'topic/:topicId/edit',
        component: TopicEdit,
        resolve: {
            topicId: RouterHelper.paramResolver("topicId"),
            categories: () => categories.listPairs()
        },
    },

];
