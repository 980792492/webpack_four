import React, { Component } from 'react'
import { connect } from 'react-redux'

import hightOviewWrap from 'utils/viewWrap.js'

class CountView extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.timer = setTimeout(() => this.props.changeCount(), 3000)
  }
  render () {
    // console.warn('count props', this.props)
    return (
      <div className='count-wrap'>
      1212
      {this.props.count}
      {/* <p>姓名: {this.props.countDetail.headDetail.name}</p> */}
      {/* <p>身高: {this.props.countDetail.headDetail.info.age}</p> */}
      <p>高阶: {this.props.test}</p>
      <p>性别：{this.props.countDetail && this.props.countDetail.headDetail}</p>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    ...state.count
  })
}
const mapDispatch = (dispatch) => ({
  ...dispatch.count
})

function loadingCheck (props) { 
  return !props.count
}

function errorCheck (props) {
  return props.error
}

// const CountViewPage = hightOviewWrap(props => !props.count)(CountView)
const CountViewPage = hightOviewWrap(loadingCheck, errorCheck)(CountView)
export default connect(mapState, mapDispatch)(CountViewPage)
