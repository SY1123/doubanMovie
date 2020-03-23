// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './common/element-ui-import'
import App from './App'
import router from './router'
import store from './store'

require.ensure([], function () {
  require('element-ui/lib/theme-default/index.css')
})

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  let TOKEN = sessionStorage.getItem('token')
  if (TOKEN) {
    request.headers.set('TOKEN', TOKEN)
  }
  next((response) => {
    return response
  })
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.sessionStorage.token) {
      console.log(window.sessionStorage)
    } else {
      alert('请登录')
      next('/components/moving')
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
