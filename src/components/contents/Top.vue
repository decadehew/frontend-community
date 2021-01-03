<template>
  <div class="fly-panel" v-show="isShowTop">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>
    <list-item :lists="lists" :isShowMore="false"></list-item>
  </div>
</template>
<script>
// components
import ListItem from './ListItem'
// mixins
import listMix from '@/mixin/list'

export default {
  name: 'Top',
  components: {
    ListItem
  },
  mixins: [listMix],
  data () {
    return {
      isTop: 1
    }
  },
  computed: {
    isShowTop () {
      return this.lists.length > 0
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
