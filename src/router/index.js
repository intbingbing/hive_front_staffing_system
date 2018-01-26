import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../store/api'
const Login = () => import('@/components/page/auth/Login');
const Container = () => import('@/components/Container');

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Container',
            component: Container
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if(to.path==='/login'){
        next();
    }else{
        let res=await api.checkCookie();
        if(res.statusCode==='200112'){
            next();
        }else{
            next('/login');
        }
    }
});

export default router;
