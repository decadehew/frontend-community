<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd v-for="(item, index) in lists" :key="'links' + index">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </dd>
      <dd><a href="mailto:udevhouse@gmail.com?subject=%E7%94%B3%E8%AB%8B%E5%8F%8B%E6%83%85%E9%80%A3%E6%8E%A5" class="fly-link">申请友链</a></dd>
    </dl>
  </div>
</template>
<script>
import { getLinks } from '@/api/content'

export default {
  name: 'Links',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    this._getLinks()
  },
  methods: {
    _getLinks () {
      getLinks().then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
