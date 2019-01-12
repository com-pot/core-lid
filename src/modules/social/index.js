import UserProfile from "./states/UserProfile";

export const states = [
    {
        name: 'app.user',
        url: '/user/:userId',
        component: UserProfile,
        resolve: {
            userId: () => 'gman',
        }
    },
];