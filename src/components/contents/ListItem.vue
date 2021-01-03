<template>
  <div>
    <ul class="fly-list">
      <li
        v-for="(item, index) in items"
        :key="'listitem' + index"
      >
        <a href="user/home.html" class="fly-avatar">
          <img :src="baseURL + item.uid.avatar" alt="頭像">
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="jie/detail.html">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">{{ 'VIP' + item.uid.isVip }}</i>
          </a>
          <span>{{ item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i> {{ item.points }}
          </span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== '0'">已結</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge"
            v-for="(tag, tagIdx) in item.tags"
            :key="'taglist' + tagIdx"
            :class="tag.tagClass"
          >{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShowMore">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="handleOnLoadMore" class="laypage-next">更多求解</a>
      </div>
      <div class="no-more gray" v-else>沒有更多了</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { baseURL } from '@/utils/request'

export default {
  name: 'ListItem',
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShowMore: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      baseURL: baseURL
    }
  },
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提問'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'feed':
            item.catalog = '動態'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建議'
            break
          case 'discuss':
            item.catalog = '討論'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    handleOnLoadMore () {
      this.$emit('onMore')
    }
  },
  filters: {
    moment (date) {
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        return moment(date).from(moment())
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.no-more {
  font-size: 16px;
  padding: 30px 0;
}

.laypage-next {
  cursor: pointer;
}
</style>
