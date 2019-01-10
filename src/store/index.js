import { init } from '@rematch/core'
import * as models from './../models'

const store = init({
  models,
})


//  导出全局dispatch使用
export const { dispatch } = store

export default store