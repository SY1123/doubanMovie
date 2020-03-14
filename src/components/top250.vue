<template>

  <div id="wrapper" class="tit" v-loading="loadingMoving">
    <h1>豆瓣top250</h1>
    <div class="indent">
      <div class="">
        <p class="ul first"></p>
        <searchTag v-for="(subject,index) in currentList" :subject="subject"></searchTag>
        <pagination :num="num" :limit="limit" @getNew="getNew"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import Pagination from './common/pagination'

  export default {
    props: {
      data: Object
    },
    data () {
      return {
        num: 0,
        limit: 5,
        top250: [],
        timer: null,
        isLoad: false,
        page: 1,
        totalPage: 0,
        start: 1,
        currentList: []
      }
    },
    created () {
      this.$store.commit('PAGE_START', {start: 0})
      this.$store.dispatch('loadingtop250')
      this.$store.commit('MOVING_LOADING', {loading: false})
      /*
      window.onscroll = () => {
        if (!this.isLoad) {
          if (util.getScrollTop() + util.getClientHeight() + 400 > util.getScrollHeight()) {
            let page = this.page + 1
            if (this.page <= this.totalPage) {
              this.isLoad = true
              this.page = page
              this.start = (this.page - 1) * 10
              this.$store.commit('PAGE_START', {start: this.start})
              this.$store.dispatch('loadingtop250')
            }
          }
        }
      }
      */
    },
    mounted () {
      setTimeout(_ => {
        this.num = this.$store.getters.ranking250.subjects.length
        this.getNew(0)
        console.log(this.num)
        console.log('top250 ' + this.$store.getters.ranking250.subjects)
      }, 1000)
    },
    components: {
      Pagination,
      'searchTag': (resolve) => {
        require(['./common/top250Tag.vue'], resolve)
      }
    },
    computed: {
      ranking250 () {
        this.isLoad = false
        let ranklist = this.$store.getters.ranking250
        this.totalPage = ranklist.total
        return ranklist
      },
      loadingMoving () {
        return this.$store.getters.loadingMoving
      }
    },
    methods: {
      getNew (value) {
        this.currentList = this.$store.getters.ranking250.subjects.slice(value, value + this.limit)
        console.log(this.currentList)
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  #wrapper {
    width: 950px;
    min-height: 500px;
    margin: 30px auto;
  }

  .tit {
    width: 950px;
    margin: 0 auto;
    margin-top: 20px;

    h1 {
      display: inline-block;
      width: 126px;
      font-size: 20px;
      color: #000;
      padding-left: 66px;
      padding-bottom: 10px;
    }
  }
</style>
