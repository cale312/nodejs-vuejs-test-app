import Login from './components/Login.vue';
import DashBoard from './components/DashBoard.vue';

export default [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard
    },
    {
        path: '/logout',
        name: 'logout',
        component: DashBoard
    }
]