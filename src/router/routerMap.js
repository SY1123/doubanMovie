/**
 * @author monkeywang
 * Date: 17/9/11
 */
export default {
  '/': {
    path: 'components/moving',
    name: 'Moving'
  },
  '/upcoming': {
    path: 'components/upcoming',
    name: 'upcoming'
  },
  '/top250': {
    path: 'components/top250',
    name: 'Top250'
  },
  '/search': {
    path: 'components/searchList',
    name: 'Search',
    meta: {
      requireAuth: true  // 该路由项需要权限校验
    }
  },
  '/moviesDetail': {
    path: 'components/common/moviesDetail',
    name: 'moviesDetail',
    meta: {
      requireAuth: true  // 该路由项需要权限校验
    }
  }
}
