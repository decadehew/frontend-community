<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': status === '' && tags === '' }"
        @click.prevent="handleOnSearch"
      >綜合</a>
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '0' }"
        @click.prevent="handleOnSearch(0)"
      >未結</a>
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '1' }"
        @click.prevent="handleOnSearch(1)"
      >已結</a>
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '' && tags === '精華' }"
        @click.prevent="handleOnSearch(2)"
      >精華</a>
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="handleOnSearch(3)"
        >按最新</a>
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="handleOnSearch(4)"
        >按熱門</a>
      </span>
    </div>
    <list-item
      :lists="lists"
      :isEnd="isEnd"
      @onMore="handleOnLoadList"></list-item>
  </div>
</template>
<script>
// component
import ListItem from './ListItem'
// mixins
import listMix from '@/mixin/list'

export default {
  name: 'List',
  components: {
    ListItem
  },
  mixins: [listMix],
  data () {
    return {}
  },
  watch: {
    current (newVal) {
      this.init()
    },
    '$route' (newVal) {
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }

      this.init()
    }
  },
  methods: {
    handleOnSearch (val) {
      // 重覆點擊
      if (typeof val === 'undefined' && this.current === '') {
        return
      }

      this.current = val
      switch (this.current) {
        case 0:
          this.status = '0'
          break
        case 1:
          this.status = '1'
          break
        case 2:
          this.status = ''
          this.tags = '精華'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tags = ''
          this.current = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
