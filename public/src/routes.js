import Login from './components/Login.vue';
import DashBoard from './components/Dashboard.vue';

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
    }
]