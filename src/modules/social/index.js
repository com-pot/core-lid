import UserProfile from "./views/UserProfile";

export const states = [
    {
        name: 'app.user',
        url: '/user/:userId',
        component: UserProfile,
        resolve: {
            // userId: RouterHelper.paramResolver('userId'), todo: use actual parameter
            userId: () => 'gman',
        }
    },
];