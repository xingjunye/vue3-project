<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <span>{{ msg }}</span>
  </div>
  <router-view/>
</template>

<script lang="ts">
  import Requset from '@/axios/request'
  import  { Vue } from 'vue-class-component'
  
  export default class App extends Vue {
    created(): void {
      console.log("开始请求");
      Requset.post("/api/test");
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
