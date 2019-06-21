const state = () => ({
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
const getters = {
    allProperties: (state) => state.properties
}
const mutations = {
    getProperties: (state, properties) => (state.properties = properties),
    newProperty: (state, property) => (state.properties.unshift(property))
}
const actions = {
   getProperties(info){
       return info.state.properties
   },
   addProperty( {commit}, property){
       console.log('trying to add property in action')
       commit('newProperty', property)
   }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}