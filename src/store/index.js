import immerPlugin from '@rematch/immer'
import createLoadingPlugin from '@rematch/loading'
import { init } from '@rematch/core'
import * as models from './../models'


const immer = immerPlugin()

const options = {}
const loading = createLoadingPlugin(options)

const store = init({
  models,
  plugins: [immer, loading]
})


//  导出全局dispatch使用
export const { dispatch } = store

export default store