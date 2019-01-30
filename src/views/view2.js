import React, { Component } from 'react'
import { connect } from 'react-redux'


class  ViewTest2 extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        ViewTest2
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

export default connect(mapState, mapDispatch)(ViewTest2)