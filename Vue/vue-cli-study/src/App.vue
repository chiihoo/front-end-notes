<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <Vuexx/> -->
    <page-a/>
    <pageB/>
  </div>
</template>

<script>
// import Vuexx from './components/vuex.vue'
import pageA from './components/a.vue'
import pageB  from './components/b.vue'
export default {
  name: 'app',
  components: {
    // Vuexx,
    pageA,
    pageB
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
