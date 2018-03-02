import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../store/api'
import * as types from "../store/types";
const Login = () => import('@/components/auth/Login');
const userContainer = () => import('@/components/userContainer');
const Test = () => import('@/components/test/TestParent');
const UserContainer = () => import('@/components/roles/UserContainer');
const SectionContainer = () => import('@/components/common/SectionContainer');
const StaffManagement = () => import('@/components/page/StaffManagement/StaffManagement');
const PostDepartmentManagement = () => import('@/components/page/PostDepartmentManagement/Index');
const ClockInManage = () => import('@/components/page/ClockInManage/ClockInManage');
const AnnouncementManage = () => import('@/components/page/AnnouncementManage/AnnouncementManage');
const CompanyManage = () => import('@/components/page/CompanyManage/CompanyManage');
const VacationManage = () => import('@/components/page/VacationManage/VacationManage');
const DepartmentFile = () => import('@/components/page/DepartmentFile/DepartmentFile');
const ChartShow = () => import('@/components/page/ChartShow/ChartShow');
const Home = () => import('@/components/page/Home/Home');
const A = () => import('@/components/A');
const B = () => import('@/components/B');

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', name: 'Container', component: userContainer },
        { path:'/login', name:'Login', component:Login },
        { path:'/test', name:'Test', component:Test },
        { path:'/user', component:UserContainer, children:[

            { path:'', redirect:{ name:'home' } },
            { path:'home', name:'home', component:Home },
            { path:'announcement', name:'announcement', component:AnnouncementManage },
            { path:'personnel_management', component:SectionContainer, children:[
                { path:'company_management', name:'company_management', component:CompanyManage },
                { path:'staff_management', name:'staff_management', component:StaffManagement,
                    beforeEnter:(to,from,next)=>{
                        router.app.$options.store.dispatch(types.GET_ALL_STAFF_INFO);
                        //console.log(router.app.$options)
                        next();
                    }
                },
                { path:'department_management', name:'department_management', component:PostDepartmentManagement },
                { path:'position_management', redirect:{ name:'department_management' } },
            ]},
            { path:'attendance_management', component:SectionContainer, children:[
                { path:'clock_in', name:'clock_in', component:ClockInManage },
                { path:'leave', name:'leave', component:VacationManage },
            ]},
            { path:'my_department', component:SectionContainer, children:[
                { path:'department_file', name:'department_file', component:DepartmentFile },
            ]},
            { path:'chart', component:ChartShow,},
            // { path:'personnel_management/company_management', name:'company_management', component:B },
            // { path:'personnel_management/staff_management', name:'staff_management', component:StaffManagement,
            //     beforeEnter:(to,from,next)=>{
            //         router.app.$options.store.dispatch(types.GET_ALL_STAFF_INFO);
            //         //console.log(router.app.$options)
            //         next();
            //     }
            // },
            // { path:'personnel_management/department_management', name:'department_management', component:PostDepartmentManagement },
            // { path:'personnel_management/position_management', redirect:'personnel_management/department_management' },

        ]}
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
            router.app.$options.store.commit(types.LOAD_HEADER_PORTRAIT_URL,res);
            next();
        }else{
            next('/login');
        }
    }
});

export default router;
