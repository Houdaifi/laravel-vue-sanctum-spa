function page(path) {
    return () => import(/* webpackChunkName: '' */ '../views/'+path+'.vue').then(m => m.default || m)
  }

export default [{
        path: '/',
        component: page('Welcome'),
        name: 'welcome',

    },
    {
        path: '/reclamations',
        component: page('Home'),
        name: 'reclamations',
        meta: {
            guard: 'auth'
        },
    },
    {
        path: '/reclamation/:id',
        component: page('Reclamation'),
        name: 'reclamation',
        meta: {
            guard: 'auth'
        },
    },
    {
        path: '/login',
        component: page('Login'),
        name: 'login',
        meta : {
            guard : 'guest'
        }
    },
    {
        path: '/register',
        component: page('Register'),
        name: 'register',
        meta : {
            guard : 'guest'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/home',

    }
];
