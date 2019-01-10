import React, { Component } from "react";
import { withRouter, Router, Switch, Route, Link } from "react-router-dom";
import { history } from 'utils/history'
import { connect } from 'react-redux'

import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import Menu from 'views/menu'

import style from './app.less'


import CountView from 'views/count'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    console.warn('app props', this.props)
    return (
      <Router history={history}>
        <Switch >
          <Route path="/login" component={() => <div>login</div>} />
        
          <Route path="/" render={
            props => {
              return <Layout className='layout-content'>
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
                      style={{ position: 'fixed', top: 24 }}
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
}
const mapState = (state, ownProps) => {
  return ({
    ...state.app
  })
}
const mapDispatch = (dispatch) => ({
  ...dispatch.app
})

export default connect(mapState, mapDispatch)(App) ;



class CustomSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Switch>
        <Route path='/content' component={CountView} />
      </Switch>
    )
  }
}