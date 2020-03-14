<template>
  <li class="item upComing">
    <a class="thumb" @click="showDetail(item.id)">
      <img class="movieImg" :src="getImageUrl(item.images.large)">
    </a>
    <div class="intro">
      <h3>
        <a @click="showDetail(item.id)" class="">{{item.title}}</a>
        <span class="icon"></span>
      </h3>
      <ul>
        <li class="dt">{{item.mainland_pubdate}}</li>
        <li class="dt"><em v-for="it in item.genres">{{it}}/</em></li>
        <li class="dt">演员:<span v-for=" cast in item.casts">{{cast.name}}/</span></li>
        <li class="dt">导演:<span v-for=" director in item.directors">{{director.name}}/</span></li>
        <li class="dt last"><span class="">{{item.collect_count}}人想看</span></li>
        <!--
                <a href="https://movie.douban.com/trailer/211279/#content" class="trailer_icon">预告片</a>
        -->
        <!-- <li>
           <a href="https://movie.douban.com/subject/25900945/cinema/hangzhou/" class="ticket_btn">
             6家影院有影讯 »
           </a>
         </li>-->
      </ul>
    </div>
  </li>
</template>
<script>

  export default {
    data () {
      return {}
    },
    props: {
      /**
       * item 电影条目
       */
      item: {
        type: Object,
        default: {}
      }
    },
    computed: {
      movieDetail () {
        return this.$store.getters.movieDetail
      }
    },
    methods: {
      showDetail (id) {
        this.$store.commit('DETAIL_LOADING', {loading: true})
        this.$router.push({path: '/moviesDetail', query: {id: id}})
      },
      getImageUrl (url) {
        return '//images.weserv.nl/?url=' + url
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import '../../../style/base.less';

  .item.upComing {
    position: relative;
    float: left;
    padding: 20px 0 20px 150px;
    width: 173px;
    height: 170px;
    border-bottom: 1px dashed #ccc;

    .thumb {
      position: absolute;
      left: 0;
      width: 130px;
      height: 170px;
      overflow: hidden;

      img {
        width: 100%;
        height: 170px;
      }
    }
  }
</style>
