import React, { Component } from 'react'
import findIndex from 'lodash/findIndex'
// import Style from './style.css'

import './app.less'
import Icon from './icon.jpg'
import { Button, Row, Col } from 'antd'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const showList = [
      {key: 1, text: '1'},
      {key: 2, text: '2'},
      {key: 3, text: '3'},
      {key: 4, text: '4'},
      {key: 5, text: '5'},
      {key: 6, text: '6'}
    ]
    const Index = findIndex(showList, {key: 2})
    console.warn('Index', Index)
    return (
      <div className='aaaa'>
        {showList.map((item, key) => (
          <p className='item' key={key}>{item.text}</p>
        ))}
        {/* <img src={Icon} /> */}
        <Row>
          {showList.map((item, key) => (
            <Col key={key}>{`Row-Col-${item.key}12`}</Col>
          ))}
        </Row>
      </div>
    )
  }
}
