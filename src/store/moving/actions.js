/**
 * @author monkeywang
 * Date: 17/3/15
 */
import {Utils} from '../../../src/common/util'
import {JavaUtils} from '../../../src/common/java'
import {SeachUtils} from '../../../src/common/search'

let utils = new Utils()
let javaUtils = new JavaUtils()
let searchUtils = new SeachUtils()
export const actions = {

  /**
   * 获取电影列表
   * @param commit
   */
  getMoving ({commit, state}) {
    console.log(state.city)
    javaUtils.get('/movie/in_theaters/find', {city: state.city}).then(res => {
      if (res !== null && res !== '') {
        commit('MOVING_LIST', {list: res})
        commit('MOVING_LOADING', {loading: false})
      } else {
        utils.get('/movie/in_theaters', {city: state.city}).then(res => {
          console.log(res)
          javaUtils.post('/movie/save_movie', res).then(res => {
            console.log(typeof res)
            var str = JSON.stringify(res)
            console.log(typeof str)
          })
          commit('MOVING_LIST', {list: res})
          commit('MOVING_LOADING', {loading: false})
        })
      }
    })
  },
  /**
   *获取电影详情
   * @param commit
   */
  getMovieDetail ({commit, state}) {
    utils.get(`/movie/subject/${state.id}`, {}).then(res => {
      javaUtils.post('/movie/save_detail', res).then(res => {
        console.log('save detail')
      })
      commit('DETAIL_LOADING', {loading: false})
      commit('MOVING_DETAIL', {movieDetail: res})
    })
  },
  /**
   * 获取当前城市即将上映电影列表
   * @param commit
   * @param state
   */
  getUpcoming ({commit, state}) {
    javaUtils.get('/movie/upcoming', {}).then(res => {
      if (res === null || res === '') {
        utils.get('/movie/coming_soon', {city: state.city, start: state.upcomBody.start + 1}).then(res => {
          if (state.upcomBody.subjects && state.upcomBody.subjects.length) {
            res.subjects = state.upcomBody.subjects.concat(res.subjects)
            commit('PAGE_LOAD', {pageload: false})
          }
          // res.start = state.upcomBody.start + 1;
          // console.log(res,state.upcomBody)
          javaUtils.post('/movie/save_movie', res).then(res => {
            console.log(typeof res)
            var str = JSON.stringify(res)
            console.log(typeof str)
            console.log('save')
          })
          commit('UP_COMBODY', {upcomBody: res})
          commit('UP_COMING', {loading: false})
        })
      }
      // res.start = state.upcomBody.start + 1;
      // console.log(res,state.upcomBody)
      commit('UP_COMBODY', {upcomBody: res})
      commit('UP_COMING', {loading: false})
    })
  },
  /**
   * 获取排名250
   * @param commit
   * @param state
   *     /*
   utils.get('/movie/top250', {start: state.start, count: 10}).then(res => {
       let subject = state.ranking250.subjects
       if (subject !== undefined) {
         res.subjects = subject.concat(res.subjects)
       }
       javaUtils.post('/movie/save_movie', res).then(res => {
         console.log(typeof res)
         var str = JSON.stringify(res)
         console.log(typeof str)
         console.log('save')
       })
       commit('LOAD_TOP250', {ranking250: res})
       commit('MOVING_LOADING', {loading: false})
     })
   */
  loadingtop250 ({commit, state}) {
    console.log('begin to find 250')
    javaUtils.get('/movie/top250', {}).then(res => {
      console.log('java')
      console.log(res)
      if (res !== null && res !== '') {
        commit('LOAD_TOP250', {ranking250: res})
        console.log('find top 250 from java' + this.$store.getters.ranking250)
      } else {
        console.log('utils')
        utils.get('/movie/top250', {start: state.start, count: 10}).then(res => {
          let subject = state.ranking250.subjects
          if (subject !== undefined) {
            res.subjects = subject.concat(res.subjects)
          }
          javaUtils.post('/movie/save_movie', res).then(res => {
            console.log(typeof res)
            var str = JSON.stringify(res)
            console.log(typeof str)
            console.log('save')
          })
          commit('LOAD_TOP250', {ranking250: res})
          commit('MOVING_LOADING', {loading: false})
        })
      }
    })
  },
  /**
   * 获取搜索列表
   * @param commit
   * @param state
   */
  getSearchList ({commit, state}) {
    console.log(state.searchText)
    searchUtils.searchList('/search_subjects', {tag: state.searchText}).then(res => {
      commit('SEARCH_LIST', {searchList: res})
      commit('SEARCH_LOADING', {loading: false})
    })
  },
  /**
   * 获取电影短评
   * @param commit
   * @param state
   */
  getMovieList ({commit, state}) {
    utils.get(`/movie/subject/${state.id}/comments`, {}).then(res => {
      console.log('commment' + res)
      console.log(res)
      commit('MOVIE_COMMENT', {comment: res})
    })
  },
  /**
   * 用户登录
   * @param commit
   * @param state
   */
  userLogin ({commit, state}) {
    javaUtils.post('/user/login', {username: state.username, password: state.password}).then(res => {
      console.log(res)
      if (res.code === 1) {
        alert('登录失败')
      } else {
        alert('登录success')
        commit('USERNAME', {username: state.username})
        commit('isLogin', {isLogin: 1})
        commit('userId', {userId: state.userId()})
        commit('loginVisible', {loginVisible: false})
      }
    })
  },
  /**
   * 用户注册
   * @param commit
   * @param state
   */
  userRegister ({commit, state}) {
    javaUtils.post('/user/register', {username: state.username, password: state.password, email: state.email}).then(res => {
      console.log(res)
      if (res.code === 1) {
        alert('注册失败')
      } else {
        alert('注册success, 请登录')
        commit('registerVisible', {registerVisible: false})
      }
    })
  },
  /**
   * 随机查询所有tag标签
   * @param commit
   * @param state
   */
  findTags ({commit, state}) {
    javaUtils.post('/tag/findRandom', {}).then(res => {
      console.log(res.data)
      this.$store.commit('tags', {tags: res.data})
    })
  }
}
