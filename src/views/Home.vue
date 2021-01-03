<template>
  <div>
    <Panel />
    <router-view></router-view>
  </div>
</template>
<script>
import Panel from '@/components/Panel'

export default {
  name: 'Home',
  components: {
    Panel
  }
}
</script>
<style lang="scss" scoped>
</style>
