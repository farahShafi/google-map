import Vuex from 'vuex';
import Vue from 'vue';
import allProperties from './modules/properties';
import loggedIn from './modules/loggedIn'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        allProperties, loggedIn
    }
});
