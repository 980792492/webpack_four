import React, { Component } from 'react'
import ReactDom from 'react-dom'
import AppRouter from 'views/routes'


ReactDom.render(
  <AppRouter />, document.getElementById('container')
)
