export default {
  state: {
    count: undefined,
    // countDetail: {
    //   headDetail: {
    //     name: 'qiyeTest',
    //     info: {
    //       age: 18
    //     }
    //   }
    // }
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload
    },
    changeCount (state, payload) {
      state.count = 'shabi'
      state.countDetail = {headDetail: '男' }
      state.error = 'baocuo'

      // return state
      // return {    使用 rematch-immer 插件 可以直接在改变state的值，并更新state的值
      //   ...state,
      //   count: 'tian gou shabi'
      // }
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    }
  })
}
