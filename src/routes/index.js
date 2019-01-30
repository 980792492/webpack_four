import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';  //  按需加载
// import CountView from 'views/count'
// import ViewTest2 from 'views/view2'
// import ViewTest3 from 'views/view3'


// import Bundle from 'utils/lazyLoad.js'
// const _import_page = (file, title) => <Bundle load={() => import(`views/${file}`)} title={title}></Bundle>

function MyLoadingComponent() {
  return <div>Loading...</div>
}


const lazyLoad = (src) => {
  return Loadable({
    loader: () => import(`views/${src}`),
    loading: MyLoadingComponent 
  });
} 

const lazyLoad2 = (src) => {
  return Loadable({
    loader: src,
    loading: MyLoadingComponent 
  });
} 


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
        {/* <Route path='/menu1-1' component={lazyLoad('count')} /> */}
        {/* 方法三 */}
        <Route path='/menu1-1' component={lazyLoad2(() => import('views/count'))} />
        <Route path='/menu1-2' component={lazyLoad2(() => import('views/view2'))} />
        {/* <Route path='/menu1-2' component={this.lazyLoad('views/view2')} /> */}
        {/* <Route path='/menu2' component={this.lazyLoad('views/view3')} />  */}
      </Switch>
    )
  }
}


// import React from 'react'

// let routes = [
//   {
//     path: '/',
//     exact: true,
//     auth: true,
//     title: '首页',
//     component: 'home'
//   },
//   {
//     path: '/youdao',
//     exact: true,
//     auth: true,
//     title: '有道',
//     component: 'youdao/index'
//   },
//   {
//     path: '/login',
//     component: 'login'
//   },
//   {
//     path: '*',
//     component: props => <div>NOT FOUND</div>
//   }
// ]

// routes = routes.map(item => {
//   return {
//     ...item,
//     component: item.path !== '*' ? props => _import_page(item.component, item.title) : item.component
//   }
// })

// export default routes