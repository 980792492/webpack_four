#!/usr/bin/env node

const shelljs = require('shelljs')
const path = require('path')
const fs = require('fs')
// 替换
var originPath = path.join(__dirname, '../template.html')
var templateFile = fs.readFileSync(originPath)
templateFile = templateFile.toString()
templateFile = templateFile.replace(/\{\{dllPath\}\}/g, '/public/vendor.dll.js')
templateFile = templateFile.replace(/\{\{bundlePath\}\}/g, '/assets/bundle.js')
templateFile = templateFile.replace('<!-- development-style -->', '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.css">')

var indexPath = path.join(__dirname, '../dist/index.html')
fs.writeFileSync(indexPath, templateFile)

// shelljs.exec('npm run dev')

