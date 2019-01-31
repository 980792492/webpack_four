import React, { Component } from 'react'
import Style from './login.less'
import { Button } from 'antd';



export default class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnMount () {
    Style.unuse()
  }
  render () {
    return (
      <div class='solar-syst'>
        <div class='sun'></div>
        <div class='mercury'></div>
        <div class='venus'></div>
        <div class='earth'></div>
        <div class='mars'></div>
        <div class='jupiter'></div>
        <div class='saturn'></div>
        <div class='uranus'></div>
        <div class='neptune'></div>
        <div class='pluto'></div>
        <div class='asteroids-belt'></div>
        <Button onClick={() => location.href='http://localhost:9000' } >link</Button>
      </div>
    )
  }
}