
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
    async getAppUser(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.setPageBaseValue(payload)
    }
  })
}
