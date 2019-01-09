import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu;
import Utils from 'utils'
import { MENU_CONFS }  from 'constants/menu'


export default class CustomMenu extends Component {
  constructor(props){
    super(props) 
    this.state ={
      openKeys: []
    }
  }
  render () {
    const menuList = MENU_CONFS
    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={this.state.openKeys}   // 当前菜单展开的nemu
        onOpenChange={this.onOpenChange.bind(this)} // SubMenu的展开回调
        defaultSelectedKeys={['1']}
        onClick={this.onClickMenuItem.bind(this)}
      >
      {this.renderMenuJSX(menuList)}
      </Menu>
    )
  }

  renderMenuJSX (menuList) { // 渲染一级或二级menu
    return  (menuList || []).map((item, index) => {
      if (item.child) {
        return (
          <SubMenu
            key={`SubMenu${index}`}
            // title={<span><Icon type="mail" /><span>{item.name}</span></span>}
            title={<span>{item.name}</span>}
          >
            {this.renderMenuItemJSX(item.child)}
        </SubMenu>
        )
      } else {
        return (
          <Menu.Item 
            key={item.route}
          >{item.name}</Menu.Item>
        )
      }
    })
  }

  renderMenuItemJSX (childList) {  //  渲染二级menu
    return (childList || []).map((item, index) => {
      return (
        <Menu.Item key={item.route}>{item.name}</Menu.Item>
      )
    } )
  }
  onOpenChange (openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    // if ([].indexOf(latestOpenKey) === -1) {
    //   this.setState({ openKeys });
    // } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    // }
  }
  onClickMenuItem ({item, key, keyPath}) { // click menu.item路由跳转
    if ( location.pathname === key) {
      return false
    } else {
      Utils.router.push('/content')
    }
  }
}