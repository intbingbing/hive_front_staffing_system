import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../store/api'
import { LOAD_HEADER_PORTRAIT_URL } from "../store/types";
const Login = () => import('@/components/auth/Login');
const userContainer = () => import('@/components/userContainer');
const Test = () => import('@/components/test/TestParent');
const UserContainer = () => import('@/components/roles/UserContainer');
const StaffManagement = () => import('@/components/page/StaffManagement/StaffManagement');
const PostDepartmentManagement = () => import('@/components/page/PostDepartmentManagement/Index');
const A = () => import('@/components/A');
const B = () => import('@/components/B');

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Container',
            component: userContainer
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
        },
        {
            path:'/user',
            component:UserContainer,
            children:[
                {
                    path:'',
                    redirect:'announcement'
                },
                {
                    path:'announcement',
                    name:'announcement',
                    component:A
                },
                {
                    path:'personnel_management/company_management',
                    name:'company_management',
                    component:B
                },
                {
                    path:'personnel_management/staff_management',
                    name:'staff_management',
                    component:StaffManagement
                },
                {
                    path:'personnel_management/department_management',
                    name:'department_management',
                    component:PostDepartmentManagement
                },
                {
                    path:'personnel_management/position_management',
                    redirect:'personnel_management/department_management'
                },
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    // if(to.path==='/login'){
    //     next();
    // }else{
    //     let res=await api.checkCookie();
    //     if(res.statusCode==='200112'){
    //         // router.app.$options.store.state.userInfo.username=res.data.username;
    //         // router.app.$options.store.state.userInfo.headerPortraitSrc=`http://122.112.210.98/ftp/${res.data.username}.jpg`;
    //         // console.log(router.app.$options.store.state.userInfo);
    //         res.headerPortraitURL = `http://122.112.210.98/ftp/${res.username}.jpg`;
    //         router.app.$options.store.commit(LOAD_HEADER_PORTRAIT_URL,res);
    //         next();
    //     }else{
    //         next('/login');
    //     }
    // }


    if(to.path==='/login'){
        next();
    }else{
        let res={"statusCode":"200112","tag":1,"username":"admin"};
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
