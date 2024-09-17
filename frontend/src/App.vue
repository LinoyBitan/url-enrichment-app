<template>
  <div id="app">
    <UrlList/>
  </div>
</template>

<script lang="ts">
import UrlList from './components/UrlList.vue';

export default {
  components:{
    UrlList,
  }
}
</script>
<style lang="scss">
#app {
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
