<template>
  <div class="search-tag">
    <a class="search-img" @click="showDetail(subject.id)">
      <img class="search-tag-img movieImg" :src="getImageUrl(subject.cover)">
    </a>

    <div class="search-brief">
      <p class="title" @click="showDetail(subject.id)">{{subject.title}}<!--/<span>{{subject.original_title}}</span>--></p>
<!--      <p class="disc">
        {{subject.year}}年
        <br>
        <span v-for="pubdate in subject.pubdates">
           {{pubdate}}
        </span>
        <br>
        <span v-for="genre in subject.genres">
          /{{genre}}
        </span>
        <br>
        导演:
        <span v-for="director in subject.directors">
          /{{director.name}}
        </span>
        <br>
        演员:
        <span v-for="cast in subject.casts">
          /{{cast.name}}
        </span>
      </p>-->
      <p class="rate">
        <el-rate
          v-model="subject.rate * 2"
          disabled
          text-color="#ff9900">
        </el-rate>
        <span class="rate-value">{{subject.rate}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      subject: {
        type: Object
      }
    },
    data () {
      return {
        msg: 'hello vue'
      }
    },
    methods: {
      getImageUrl (url) {
        return '//images.weserv.nl/?url=' + url
      },
      showDetail (id) {
        this.$store.commit('DETAIL_LOADING', {loading: true})
        this.$router.push({path: '/moviesDetail', query: {id: id}})
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import '../../../style/color.less';
  @import "../../../style/base";

  .search-tag {
    padding: 20px;
    border-top: 1px dashed @line;

    .search-img {
      width: 100px;
      height: 140px;
      overflow: hidden;
      display: inline-block;

      .search-tag-img {
        width: 100px;
      }
    }

    .search-brief {
      display: inline-block;
      vertical-align: top;
      margin-left: 40px;

      p {
        margin-bottom: 20px;
      }

      .title {
        color: #666699;
        font-size: 14px;

        span {
          font-size: 12px;
        }
      }

      .disc {
        width: 500px;
      }

      .rate {
        .el-rate {
          display: inline-block;

          .el-rate__icon {
            font-size: 14px;
          }
        }

        .rate-value {
          color: #ff9900
        }
      }
    }
  }

</style>
