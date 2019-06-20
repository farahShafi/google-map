<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
    <!--<GoogleMap></GoogleMap>-->
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<Map></Map>-->
  </div>
</template>

<script>
import Nav from './components/navbar'
import GoogleMap from "./components/googleMap";
import Map from "./components/map"

export default {
  name: 'app',
  components: {
    Nav,
    GoogleMap,
    Map
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
