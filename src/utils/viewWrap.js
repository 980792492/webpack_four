import React, { Component } from 'react'
import {Spin} from 'antd'


//  高阶组件 给页面级组件 add loading, error 处理
export default function hightOviewWrap (loadingCheck, errorCheck) {
  return function (WrappedComponent) {
    return class extends WrappedComponent {
      componentWillUpdate(nextProps, nextState) {
        console.warn('withLoading将会更新');
      }
      render () {
        console.warn('this.props', this.props)
        if (loadingCheck(this.props)) {
          return <Spin tip="加载中" size="large">
            {super.render()}
          </Spin>
        }
        if (errorCheck(this.props)) {
          return <Spin tip="error" size="large">
            {super.render()}
          </Spin>
          // return <div className='loading-modal'>
          //     <p>loading</p>
          //   {super.render()}
          // </div>
        } else {
          return super.render()
        }
      }
    }
  } 
}
