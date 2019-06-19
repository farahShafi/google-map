import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
// style
import './assets/css/custom.css'

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyB4VcYuzSnXKi3bGbjBRre_GDSd8keYLkM",
        libraries: "places" // necessary for places input
    }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
