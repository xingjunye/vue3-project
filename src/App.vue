<template>
  <router-view/>
</template>

<script lang="ts">
  import Requset from '@/axios/request'
  import { Vue } from 'vue-class-component'

  export default class App extends Vue {
    created(): void {
      console.log("开始请求");
      Requset.post("/api/test");
    }
  }
</script>

<style lang="scss">
  html,body{
    padding: 0;
    margin: 0;
  }
  #app{
    height: 100vh;
    width: 100vw;
  }
</style>
