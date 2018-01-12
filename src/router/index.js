import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'
import md5 from 'crypto-js/md5'
import hex from 'crypto-js/enc-hex'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container
    }
  ],
  mode:'history'
})

router.beforeEach((to, from, next) => {
    let password='a';
    console.log(password);
    let tmp = md5(password);
    console.log("【0密】："+tmp);
    let secret = md5(password).toString(hex);
    console.log('【1密】：'+secret);
    secret = md5(secret).toString(hex);
    console.log('【2密】：'+secret);
    next();
});

export default router;
