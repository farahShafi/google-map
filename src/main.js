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
import ReactiveStorage from "vue-reactive-localstorage";

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyB4VcYuzSnXKi3bGbjBRre_GDSd8keYLkM",
        libraries: "places" // necessary for places input
    }
});
Vue.use(ReactiveStorage, {
    properties: [
        {
            formatted_address: '412 West 9000 South, Sandy, UT 84070\n' +
            'Sandy Sandy Utah United States',
            full_name: 'Timcoat Tim',
            price: '350k',
            description: 'Single Home, Built in 1998',
            lat: '40.5886089',
            lng: '-111.9034992'
        },
        {
            formatted_address: 'South Salt Lake, UT 84115\n' +
            'South Salt Lake South Salt Lake, Salt Lake City Utah United States',
            full_name: 'Chris Hornok',
            price: '470k',
            description: 'twin home, Built in 2010',
            lat: '40.6973223',
            lng: '-111.8784961'
        }
    ]
})

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
