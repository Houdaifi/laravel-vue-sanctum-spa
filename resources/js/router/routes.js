const Settings = () => import('../Views/Settings.vue');
const Profile = () => import('../Views/Profile.vue');
const Password = () => import('../Views/Password.vue');
const Login = () => import('../Views/Login.vue');
const Register = () => import('../Views/Register.vue');
const Home = () => import('../Views/Home.vue');
const Welcome = () => import('../Views/Welcome.vue');
const Reclamation = () => import(/* webpackChunkName: '' */ '../Views/Reclamation.vue');

export default [{
        path: '/',
        component: Welcome,
        name: 'welcome',

    },
    {
        path: '/reclamations',
        component: Home,
        name: 'reclamations',
        meta: {
            guard: 'auth'
        },
    },
    {
        path: '/reclamation/:id',
        component: Reclamation,
        name: 'reclamation',
        meta: {
            guard: 'auth'
        },
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta : {
            guard : 'guest'
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta : {
            guard : 'guest'
        }
    },
    {
        path: '/settings',
        component: Settings,
        redirect: {
            name: 'profile'
        },
        name: 'settings',
        meta: {
            guard: 'auth'
        },
        children: [{
                path: 'profile',
                component: Profile,
                name: 'profile',
                meta: {
                    guard: 'auth'
                },

            },
            {
                path: 'password',
                component: Password,
                name: 'password',
                meta: {
                    guard: 'auth'
                },

            },

        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/home',

    }
];
