import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../store/api'
import { LOAD_HEADER_PORTRAIT_URL } from "../store/types";
const Login = () => import('@/components/page/auth/Login');
const Container = () => import('@/components/Container');
const Test = () => import('@/components/page/Test');

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
        },
        {
            path:'/test',
            name:'Test',
            component:Test
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if(to.path==='/login'){
        next();
    }else{
        let res=await api.checkCookie();
        if(res.statusCode==='200112'){
            // router.app.$options.store.state.userInfo.username=res.data.username;
            // router.app.$options.store.state.userInfo.headerPortraitSrc=`http://122.112.210.98/ftp/${res.data.username}.jpg`;
            // console.log(router.app.$options.store.state.userInfo);
            res.headerPortraitURL = `http://122.112.210.98/ftp/${res.username}.jpg`;
            router.app.$options.store.commit(LOAD_HEADER_PORTRAIT_URL,res);
            next();
        }else{
            next('/login');
        }
    }
});

export default router;
