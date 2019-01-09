
let presets = [
  "@babel/preset-env",
  "@babel/preset-react"
]

let plugins = [
  "@babel/plugin-transform-runtime",
  ["import", {  //  antd 的style 会按需引入
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": 'css' // `style: true` 会加载 less 文件
  }]
]

module.exports = {
  presets,
  plugins
}
