import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
// style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/custom.css'

// components' routes
import NewProperty from './components/newProperty'
import Map from './components/map'
import Login from './components/login'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyB4VcYuzSnXKi3bGbjBRre_GDSd8keYLkM",
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
  render: h => h(App),
    router
}).$mount('#app')
