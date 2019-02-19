import React, { Component } from 'react'
import { connect } from 'react-redux'

import Style from './layoutTest.less'

class  ViewTest3 extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='layout-test'>
        ViewTest3
        <div className='content'>
          {
            [1,2,3,4].map((item, index) => <div className={`item${index + 1}`}>{item}</div> )
          }
        </div>
        <div>footer</div>
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