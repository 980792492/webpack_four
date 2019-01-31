const isLocal = process.env.NODE_ENV === 'local'   // node环境上设置NODE_ENV
// 在webpack4 增加了mode模式配置 在浏览器环境下指定了 process.env.NODE_ENV 的值，
// 默认是development，但node环境中还是需要cross-env来设置。要在json里script中设置
// mode 是 webpack 4 中新增加的参数选项，其有两个可选值：production 和 development。mode 不可缺省，需要二选一

let presets = [
  ["@babel/preset-env",
    {
    "modlues": false, // 关闭babel的自动转化模块功能，保留ES6模块语法
    useBuiltIns: "usage",  //  仅在需要的地方 polifill     
  }
  ],
  "@babel/preset-react"   // 预设，转换 react 语法
]

let plugins = [
  "@babel/runtime",   // polyfill 文件的相关线上环境
  "@babel/plugin-syntax-dynamic-import",
  ["import", {  //  antd 的style 会按需引入
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": 'css' // `style: true` 会加载 less 文件
  }]
]

if (isLocal) {    // 配置本地 开发 babel
  presets = [
    ["@babel/preset-env", {
      useBuiltIns: "usage",  //  仅在需要的地方 polifill 
    }],
    "@babel/preset-react",
    '@babel/preset-typescript'
  ]
  //  本地开发 antd 全部打包进dll文件，不使用按需引用
  plugins =  [
    '@babel/plugin-transform-runtime',  // polyfill 文件的相关本地环境，帮助去除使用不到的 polyfill
    "@babel/plugin-syntax-dynamic-import",
    // ['@babel/plugin-proposal-decorators', { 'legacy': true }],  // @connect 修饰器 语法支持
    // ['@babel/plugin-proposal-class-properties', { 'loose': true }],   
  ]
}



module.exports = {
  presets,
  plugins
}
