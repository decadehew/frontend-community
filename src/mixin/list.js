import { getList } from '@/api/content'

export default {
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      current: '',
      status: '',
      tags: '',
      sort: 'created',
      page: 0,
      limit: 20,
      isTop: 0,
      catalog: '',
      lists: []
    }
  },
  created () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getList()
  },
  methods: {
    init (route) {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getList()
    },
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return

      this.isRepeat = true

      const option = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tags: this.tags,
        status: this.status
      }

      getList(option)
        .then((res) => {
          // 請求鎖，等待返回數據後，再打開鎖
          this.isRepeat = false
          if (res.code === 200) {
            // 判斷如果 res.data 小於20條，表示是最後一頁
            if (res.data.length < this.limit) {
              this.isEnd = true
            }

            if (this.lists.length === 0) {
              this.lists = res.data
            } else {
              this.lists = this.lists.concat(res.data)
            }

            this.page++
          }
        })
        .catch((err) => {
          this.isRepeat = false
          if (err) {
            this.$alert(err.message)
          }
        })
    },
    handleOnLoadList () {
      // this.page++
      this._getList()
    }
  }
}
