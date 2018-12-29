import React from 'react';
import {UIView} from "@uirouter/react";

import TopicListing from "./states/TopicListing";
import TopicView from "./states/TopicView";


export const states = [
    {name: 'app.forum', url: '/forum/', component: () => (<UIView/>), abstract: true},
    {
        name: 'app.forum.topicListing',
        url: '?page',
        component: TopicListing,
    },
    {
        name: 'app.forum.topicView',
        url: 'topic/:topicId',
        component: TopicView,
        resolve: {
            topic: ($transition$) => ({
                id: $transition$.params().topicId,
                title: "Bigg topiccc",
                description: "'<hr/>Ayoooo, let's get crayzy dumb!!<br/><br/>",
            }),
            posts: () => ([
                {id: 1496, author: 'tina', content: 'Burgers <i>suuuck</i>.'},
                {id: 1499, author: 'bob', content: 'Burgers <i>suuuck</i>.'},
                {id: 2413, author: 'margaret', content: 'Burgers <i>suuuck</i>.'},
                {id: 2689, author: 'louise', content: 'Burgers <i>suuuck</i>.'},
                {id: 2690, author: 'parker', content: 'Burgers <i>suuuck</i>.'},
            ])
        }
    },
];
