## webpack
### webpack 基础

* entry——入口文件

* output——出口文件

* devServer——webpack-dev-server相关配置
```
devServer: {
  // contentBase: './dist',
  contentBase: path.join(__dirname, 'dist'),
  hot: true,
  host: 'localhost',
  // compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
  port: 9000,
  stats: {
    performance: true,  
    timings: true
  },
  // clientLogLevel: 'none'
  historyApiFallback: true,
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // },
  proxy: {  // 设置接口匹配到leo，转发to
    '/leo/**': {
      target: 'http://odev.dian.so',
      changeOrigin: true
    },
  }
}
```

* performance——配置展示性能测试
```
performance: { // 配置展示性能测试
  hints: 'warning', // 枚举【false, 'error', 'warning'】 告诉 webpack 抛出一个错误或警告
  maxAssetSize: 30000000, // 整数类型（以字节为单位）  资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)
  maxEntrypointSize: 50000000, // 整数类型（以字节为单位）根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)
  assetFilter: function (assetFilename) { // 此属性允许 webpack 控制用于计算性能提示的文件
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js') // 此选项只给出.css || .less性能提示
  }
}
```

  
* mode——mode默认设置全局development,并默认配置相关插件

* watch——true // 开启监听文件更改，自动刷新

* watchOptions——watch监听设置
```
watchOptions: {
// ignored: /node_modules/, // 忽略不用监听变更的目录
  aggregateTimeout: 1000, // 防止重复保存频繁重新编译,500毫秒内重复保存不打包
// poll: 1000 // 每秒询问的文件变更的次数
}
```

* DllPlugin——创建dll文件
```
new webpack.DllPlugin({
    // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
  context: process.cwd(),
  path: path.join(__dirname, 'dist/public', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
  name: '[name]_library'
})
```

* DllRefrencePlugin——开发／生产配置引用dll文件
```
new webpack.DllReferencePlugin({
  // 跟dll.config里面DllPlugin的context一致
  context: process.cwd(),
  manifest: require('./dist/public/vendor-manifest.json'),
  name: 'vendor_library'
})
```
* NamedModulesPlugin——开启HMR 将使用模块的相对路径

* DefinePlugin——编译时创建全局变量，注意与mode的区别

* ProvidePlugin——设置全局方法别名

* cleanWebpackPlugin——清空打包目录插件

* webpackMd5Hash——webpack的chunkhash根据文件内容生成hash

* copyWebpackPlugin——复制静态资源的插件

*  HtmlWebpackPlugin——处理常规 html 文件中的代码插入

* HotModuleReplacementPlugin——热加载。

* NoEmitOnErrorsPlugin——减少来自 CLI 的无用警告消息。

* MiniCssExtractPlugin——生产构建期间优化样式文件大小。

* optimization——提取公用代码, 公共模块自动抽出来，变成一个包


### webpack优化 总结三点：

* 提高编译速度
* 减小编译输出的文件体积
* 帮助提升页面性能

### 1 提升编译速度，在项目大小确定，机器配置确定的情况下，
* 1 增量编译
* 2 加缓存
* 3 任务并行

1，开启webpack缓存 ，
module.exports = {
  cache: true,
  // ... 其他配置
}

2，开启loader缓存，
module: {
  rules: [
    {
      test: /\.js$/,
      loader: ['babel-loader?cacheDirectory=true'] // 开启babel-loader缓存
    }
  ]
}

3， 使用模块缓存， hard-source-webpack-plugin

4， webpack与并行
happypack插件为webpack增加并行处理的能力。也强烈建议使用

二： 优化webpack模块查询：
* 1 resolve.alias，设置别名
* 2 resolve.modules，指定模块
* 3 loader.include && loader.exclude，精细指定loader处理的文件
* 4 resolve.extensions，设置模块查找时的自动补全扩展名

三：减少需要编译的模块 (重要)
* 1 webpack.DllPlugin + webpack.DllRefrencePlugin
* 2  module.noParse (指定不需要解析的模块)
* 3 externals (排除外部依赖，不需要对其进行处理)
上面的内容主要是围绕开发（development）场景进行的，方便我们高效无缝地进行开发

But在生产环境，我们的优化原则就是文件越小越好，越少越好同一个模块只打包一份，文件大小就是最小的webpack.optimize.CommonsChunkPlugin插件
```
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: 2
})
````


#### 
此次设置优化:
* 1 设置开发node变量 local babel.config.js中根据local 加载不同的预设和插件 解析
```
let presets = [
  **
]
let plugins = [
 **
]

if (local) {
  presets = [
    **
  ]
 plugins = [
  **
  ]
}
module.exports = {
  presets,
  plugins
}

```
* 2 生成不同的dll文件， 本地开发，将非业务代码全部打包dll,分不同的dll， localDll 文件分环境加载

```
entry: {
  vendor: [
    'react',
    'react-dom',
    '***'
  ]
}
```










