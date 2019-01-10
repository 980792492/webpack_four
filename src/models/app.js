import Api from 'utils/axios'
import Utils from 'utils'

export default {
  state: {
    app: 'tangxxi.cn'
  },
  reducers: {
    setPageBaseValue(payload) {
      return {
        ...state,
        payload
      }
    }
  },
  effects: (dispatch) => ({
    async getAppUser(params, rootState) {
      const res = await Api.get('/leo/1.0/h5/login', {params})
      console.log('res', res)
      // this.setPageBaseValue(payload)
    },
    notify (payload) {
      Utils.notify(payload)
    }
  })
}
