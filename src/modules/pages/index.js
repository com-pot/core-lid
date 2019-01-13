import Intro from "./Intro";
import SignIn from "./SignIn";
import State404 from "./State404";

export const states = [
    {name: 'app.intro', url: '/', component: Intro},
    {name: 'app.registration', url: '/sign/in', component: SignIn},
    {
        name: 'app.404', component: State404,
        params: {
            origin: null
        },
        resolve: {
            origin: ($transition$) => $transition$.params().origin,
        },
    },
];
