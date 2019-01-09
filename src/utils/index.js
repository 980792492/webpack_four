
import { history } from 'utils/history'

function routerFilter (router) {  // 对history.push的方法二次封装
  let push = router.push
  router.push = function (path, ...args) {
    if (typeof path === 'string') {
      path = path.replace(/\s/g, '')
      try {
        decodeURIComponent(path)
      } catch (e) {
        path = encodeURI(path)
      }
    }
    push(path, ...args)
  }
  return router
}

const router = routerFilter(history)



export default {
  router
}