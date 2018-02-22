// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import store from './store/index.js'
import App from './App'
import * as api from './store/api'
import * as types from './store/types'
import * as utils from './utils/publicFunction'
// 点线特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles);
Vue.config.productionTip = false
Vue.use(ElementUI);
//api挂载到全局，使用方法：this.$api
Vue.prototype.$api=api;
Vue.prototype.$types=types;
Vue.prototype.$utils=utils;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
})
