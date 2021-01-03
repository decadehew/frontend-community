<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
<script>
import appHeader from '@/components/Header'
import appFooter from '@/components/Footer'

export default {
  name: 'App',
  components: {
    appHeader,
    appFooter
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";

.errors {
  color: #c00;
}

.gray {
  color: #999;
}

</style>
