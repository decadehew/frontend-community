<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link to="/" tag="li" class="layui-hide-xs">
          <a>首页</a>
        </router-link>
        <router-link
          v-for="item in tabs"
          :key="item.id"
          :class="item.classList"
          :to="item.link"
          tag="li"
        >
          <a>{{ item.title }} <span class="layui-badge-dot" v-if="item.isNew"></span></a>
        </router-link>
        <li class="layui-hide-xs"><span class="line"></span></li>
        <!-- logined -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="#">我發表的貼</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="#">我收藏的貼</a></li>
        </template>
      </ul>
      <div class="right layui-hide-xs">
        <span class="layui-icon layui-icon-search">&#xe615;</span>
        <a href="#" class="layui-btn">發表新貼</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel',
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      tabs: [
        {
          id: 'question',
          title: '提問',
          link: '/index/ask',
          isNew: false
        },
        {
          id: 'share',
          title: '分享',
          link: '/index/share',
          isNew: true
        },
        {
          id: 'discuss',
          title: '討論',
          link: '/index/discuss',
          isNew: false
        },
        {
          id: 'advise',
          title: '建議',
          link: '/index/advise',
          isNew: false
        },
        {
          id: 'notice',
          title: '公告',
          link: '/index/notice',
          isNew: false
        },
        {
          id: 'feed',
          title: '動態',
          link: '/index/feed',
          isNew: false
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}
.panel {
  position: relative;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

ul {
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
  }
  .line {
    display: inline-block;
    height: 10px;
    width: 1px;
    background-color: #e2e2e2;
    vertical-align: middle;
    margin: 0 20px;
  }
}

.right {
  position: absolute;
  right: 0;
  top: 0;
  .layui-icon-search {
    margin-right: 10px;
    font-size: 20px;
    &:hover {
      color: #e913e9;
      cursor: pointer;
    }
  }
}
</style>
