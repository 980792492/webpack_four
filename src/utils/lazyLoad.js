// // 代码拆分
// import React, { Component } from 'react'
// // import {setTitle} from 'utils'
// export default class Bundle extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           component: null
//       };
//   }

//   componentWillMount() {
//       this.load(this.props)
//   }

//   componentWillReceiveProps(nextProps) {
//       if (nextProps.load !== this.props.load) {
//         this.load(nextProps)
//       }
//   }

//   load(props) {
//     this.setState({
//         component: null
//     });
//     //注意这里，使用Promise对象; component.default导出默认
//     props.load().then((component) => {
//         this.setState({
//             component: component.default ? component.default : component
//         // }, () => setTitle(props.title));
//       });

//     });
//   }

//   render() {
//       let Component = this.state.component
//       let {props} = this.props
//       return (Component) ? <Component {...props}></Component> : null;
//   }
// }