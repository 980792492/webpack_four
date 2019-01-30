import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from 'utils/history'
import { connect } from 'react-redux'

import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import Menu from 'views/menu'
import style from './app.less'

import CustomSwitch from 'routes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  componentWillMount () {
    // this.props.actions.getAppUser({moblie:1, token: 1})
  }
  
  render() {
    // console.warn('app props', this.props)
    console.log('env', process.env, process.env.NODE_ENV)
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
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
}
const mapState = (state, ownProps) => {
  return ({
    ...state.app
  })
}
const mapDispatch = (dispatch) => ({
  // 返回actios页面的方法执行this.props.actios
  actions: {
    ...dispatch.app
  }
})

export default connect(mapState, mapDispatch)(App) ;
