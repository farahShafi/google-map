import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
import Vuex from 'vuex';
import store from './store'

// style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/custom.css'

// components' routes
import NewProperty from './components/newProperty'
import Map from './components/map'
import Login from './components/login'

Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC4Nm5sj16hCNkuwFOAxtO1j6bAUalevGA",
        libraries: "places" // necessary for places input
    }
});

Vue.config.productionTip = false

const routes = [
    {
        path:'/',
        name: 'Map',
        component: Map,
        meta: {
            title: 'properties'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/newProperty',
        name: 'New',
        component: NewProperty
    }
]
const router = new VueRouter({
    routes
})
new Vue({
  mode: 'history',
  store,
  render: h => h(App),
    router
}).$mount('#app')
