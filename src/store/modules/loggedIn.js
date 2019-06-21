const state = () => ({
    loggenIn: false
})
const getters = {
    loggedIn: (state) => state.loggenIn
}
const mutations = {
    GET_LOGGED_IN: (state, loggenIn) => (state.loggedIn = loggenIn),
    SET_LOGGED_IN: (state, loggenIn) => (state.loggenIn = loggenIn)
}
const actions = {
    getloggedIn(info){
        return info.state.loggenIn
    },
    setloggedIn( {commit}, loggedIn){
        console.log('trying to add in action')
        commit('SET_LOGGED_IN', loggedIn)
    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}