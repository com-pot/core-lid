import Intro from "./Intro";
import SignIn from "./SignIn";

export const states = [
    {name: 'app.intro', url: '/', component: Intro},
    {name: 'app.registration', url: '/sign/in', component: SignIn}
];
