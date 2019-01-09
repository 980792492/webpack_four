//  react-router v4  标准采用路由嵌套，该文件 可以 不用
// import React, { Component } from 'react'
// import { Layout, Icon } from 'antd';
// const { Header, Sider, Content } = Layout;

// import Menu from 'views/menu'
// import Style from './app.less'


// export default class App extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       collapsed: false
//     }
//   }

//   toggle () {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   }

//   render () {
//     return (
//       <Layout className='layout-content'>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={this.state.collapsed}
//       >
//         <div className="logo" />
//         <Menu 
//           history={this.props.history}
//           location={this.props.location}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ background: '#fff', padding: 0 }}>
//           <Icon
//             className="trigger"
//             type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
//             onClick={this.toggle.bind(this)}
//             style={{position: 'fixed', top: 24}}
//           />
//         </Header>
//         <Content style={{
//           margin: '24px 16px', background: '#fff', minHeight: 1080,
//         }}
//         >
//           {this.props.CustomSwitch}
//         </Content>
//       </Layout>
//     </Layout>
//   );
//   }
// }
