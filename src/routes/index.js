import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';  //  按需加载



function MyLoadingComponent() {
  return <div>Loading...</div>
}

const lazyLoad = (src) => {
  return Loadable({
    loader: () => import(`views/${src}`),
    loading: MyLoadingComponent 
  });
} 

// const lazyLoad2 = (src) => {
//   return Loadable({
//     loader: src,
//     loading: MyLoadingComponent 
//   });
// } 


export default class CustomSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Switch>
        {/* 方法一*/} 
        {/* <Route path='/menu1-1' component={Loadable({ loader: () => import('views/count'), loading: MyLoadingComponent })} /> */}
        {/* 方法二， import() 不能接收完全变量  */}        
        <Route path='/menu1-1' component={lazyLoad('count')} />
        {/* 方法三 */}
        {/* <Route path='/menu1-1' component={lazyLoad2(() => import('views/count'))} /> */}
        {/* <Route path='/menu1-2' component={lazyLoad2(() => import('views/view2'))} /> */}
        {/* <Route path='/menu1-2' component={this.lazyLoad('views/view2')} /> */}
        {/* <Route path='/menu2' component={this.lazyLoad('views/view3')} />  */}
      </Switch>
    )
  }
}
