<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <!--<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->

      <v-app-bar-title>AppSyncでTODOリスト</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <HelloAppSync class="container"/>
    </v-main>
  </v-app>
</template>

<script>
import HelloAppSync from './components/HelloAppSync.vue'

export default {
  name: 'App',
  components: {
    HelloAppSync
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>