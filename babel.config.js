const local = process.env.NODE_ENV === 'local'
// const local = ''


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

if (local) {
  presets = [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
  //  本地开发 antd 全部打包进dll文件，不使用按需引用
  plugins =  [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ]
}



module.exports = {
  presets,
  plugins
}
