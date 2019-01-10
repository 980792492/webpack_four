import React, { Component } from 'react'
import { connect } from 'react-redux'

class CountView extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render () {
    console.warn('count props', this.props)
    return (
      <div className='count-wrap'>
      1212
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




export default connect(mapState, mapDispatch)(CountView)
