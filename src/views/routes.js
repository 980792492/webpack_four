import React, { Component } from "react";
import { withRouter, Router, Switch, Route, Link } from "react-router-dom";
import { history } from 'utils/history'

import { routes } from './../routes/index'
import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import Menu from 'views/menu'


class  AppRouter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render () {
    return (
      <Router history={history}>
        <Switch > 
          <Route path="/login" component={() => <div>login</div>} />
          <Route path="/"  render={
            props => {
              return <Layout>
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
                >
                  <div className="logo" />
                  <Menu 
                    history={history}
                    location={location}
                  />
                </Sider>
                <Layout>
                  <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle.bind(this)}
                      style={{position: 'fixed', top: 24}}
                    />
                  </Header>
                  <Content style={{
                    margin: '24px 16px', background: '#fff', minHeight: 1080,
                    }}
                  >
                    <CustomSwitch />
                  </Content>
                </Layout>
              </Layout>
            }
          } />
        </Switch>
      </Router>
    )
  }

  // render () {
  //   return (
  //     <Router history={history}>
  //       <Switch > 
  //         <Route path="/login" component={() => <div>login</div>} />
  //         <Route path="/"  render={
  //           props => {
  //             return <App
  //               {...props}
  //               CustomSwitch={<CustomSwitch />}  // app接收的this.props.children是一个组件
  //             />
  //           }
  //         }
  //         />
  //       </Switch>
  //     </Router>
  //   )
  // }
} 

export default AppRouter;




class CustomSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <Switch>
          <Route path='/content' component={() => <div> a</div>} />
      </Switch>
    )
  }
}