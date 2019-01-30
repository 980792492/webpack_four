import React, { Component } from 'react'
import { connect } from 'react-redux'


class  ViewTest3 extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        ViewTest3
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

export default connect(mapState, mapDispatch)(ViewTest3)