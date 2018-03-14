import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../store/api'
import * as types from "../store/types";

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', redirect:{ name:'staff_management' } },
        { path:'/login', name:'Login', component:resolve => require(['@/components/auth/Login.vue'],resolve)},
        { path:'/test', name:'Test', component:resolve => require(['@/components/test/TestParent'], resolve)},
        { path:'/user', component:resolve => require(['@/components/roles/UserContainer'], resolve), children:[

            { path:'', redirect:{ name:'home' } },
            { path:'home', name:'home', component:resolve => require(['@/components/page/Home/Home'], resolve) },
            { path:'announcement', name:'announcement', component:resolve => require(['@/components/page/AnnouncementManage/AnnouncementManage'], resolve)  },
            { path:'personnel_management', component:resolve => require(['@/components/common/SectionContainer'], resolve), children:[
                { path:'company_management', name:'company_management', component:resolve => require(['@/components/page/CompanyManage/CompanyManage'], resolve) },
                { path:'staff_management', name:'staff_management', component:resolve => require(['@/components/page/StaffManagement/StaffManagement'], resolve),
                    beforeEnter:(to,from,next)=>{
                        router.app.$options.store.dispatch(types.GET_ALL_STAFF_INFO);
                        //console.log(router.app.$options)
                        next();
                    }
                },
                { path:'department_management', name:'department_management', component:resolve => require(['@/components/page/PostDepartmentManagement/Index'], resolve) },
                { path:'position_management', redirect:{ name:'department_management' } },
            ]},
            { path:'attendance_management', component:resolve => require(['@/components/common/SectionContainer'], resolve), children:[
                { path:'clock_in', name:'clock_in', component:resolve => require(['@/components/page/ClockInManage/ClockInManage'], resolve) ,
                    beforeEnter:(to,from,next)=>{
                        router.app.$options.store.commit(types.CHANGE_LOADING,{status:true});
                        //console.log(router.app.$options)
                        next();
                    }
                },
                { path:'leave', name:'leave', component:resolve => require(['@/components/page/VacationManage/VacationManage'], resolve)  },
            ]},
            { path:'my_department', component:resolve => require(['@/components/common/SectionContainer'], resolve), children:[
                { path:'department_file', name:'department_file', component:resolve => require(['@/components/page/DepartmentFile/DepartmentFile'], resolve) },
            ]},
            { path:'chart', component:resolve => require(['@/components/page/ChartShow/ChartShow'], resolve) },
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

        ]},
        { path:'*', component:resolve => require(['@/components/page/errorPage/404.vue'], resolve),},
    ]
});

router.beforeEach(async (to, from, next) => {
    if(to.path==='/login'){
        next();
    }else{
        let res=await api.checkCookie();
        if(res.statusCode==='200112'){
            router.app.$options.store.state.userInfo.username=res.username;
            router.app.$options.store.state.userInfo.headerPortraitSrc=`http://122.112.210.98/ftp/${res.username}.jpg`;
            router.app.$options.store.commit(types.LOG_IN,res);
            // console.log(router.app.$options.store.state.userInfo);
            //router.app.$options.store.commit(LOAD_HEADER_PORTRAIT_URL,res);
            next();
        }else{
            next('/login');
        }
    }

    //
    // if(to.path==='/login'){
    //     next();
    // }else{
    //     let res={"statusCode":"200112","tag":1,"username":"admin"};
    //     if(res.statusCode==='200112'){
    //         // router.app.$options.store.state.userInfo.username=res.data.username;
    //         // router.app.$options.store.state.userInfo.headerPortraitSrc=`http://122.112.210.98/ftp/${res.data.username}.jpg`;
    //         // console.log(router.app.$options.store.state.userInfo);
    //         res.headerPortraitURL = `http://122.112.210.98/ftp/${res.username}.jpg`;
    //         router.app.$options.store.commit(types.LOAD_HEADER_PORTRAIT_URL,res);
    //         next();
    //     }else{
    //         next('/login');
    //     }
    // }
});

export default router;
