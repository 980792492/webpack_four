const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成Html插件
const CleanWebpackPlugin = require('clean-webpack-plugin') //   清空打包目录插件, clear 回滚有问题
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['antd/dist/antd.css'],
    app: './src/index.js',
    polyfills: './src/polyfills.js'  
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: '/'   //  这里放的是静态资源CDN的地址
  },
  resolve: {
    extensions: ['.js'],  //  指定js文件类型
    alias: {
      components: path.join(__dirname, 'src/components'),  
      constants: path.join(__dirname, 'src/constants'),
      models: path.join(__dirname, 'src/models'),
      routes: path.join(__dirname, 'src/routes'),
      store: path.join(__dirname, 'src/store'),
      utils: path.join(__dirname, 'src/utils'),
      views: path.join(__dirname, 'src/views')
    }
  },
  performance: { // 配置展示性能测试
    hints: 'warning', // 枚举【false, 'error', 'warning'】 告诉 webpack 抛出一个错误或警告
    maxAssetSize: 30000000, // 整数类型（以字节为单位）  资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)
    assetFilter: function (assetFilename) { // 此属性允许 webpack 控制用于计算性能提示的文件
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js') // 此选项只给出.css || .less性能提示
    }
  },
  mode: 'development',  // mode默认设置全局development,可设置覆盖process.env.NODE_ENV
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'), //  限制范围，提高打包速度
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader/useable'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }],
        include: path.join(__dirname, 'src'), //  限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
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
  },
  // watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
  //   ignored: /node_modules/, // 忽略不用监听变更的目录
    aggregateTimeout: 1000, // 防止重复保存频繁重新编译,500毫秒内重复保存不打包
  //   poll: 1000 // 每秒询问的文件变更的次数
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output webpack four',
      filename: 'index.html',
      template: path.join(__dirname, 'index_template.html'),
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true// 压缩 去掉引号
      }
    }),
    new webpack.DefinePlugin({   //  允许创建一个在编译时可以配置的全局常量,浏览器
        'process.env.NODE_ENV': JSON.stringify('local')   
    }),
    new ManifestPlugin(),
    // new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(), // 开启HMR 将使用模块的相对路径，而不是数字标识符，建议用于开发环境
    new webpack.HotModuleReplacementPlugin(), //  启用 HMR
    new webpack.DllReferencePlugin({
       // 跟dll.config里面DllPlugin的context一致
       context: process.cwd(),
      manifest: require('./dist/public/vendor-manifest.json'),
      name: 'vendor_library'
    })
  ],
  optimization: { // 提取公用代码, 公共模块自动抽出来，变成一个包，前提是这个包大于 30kb
    splitChunks: {
      cacheGroups: {  // 该配置项  类似之前的 CommonChunks 实例， cacheGroups 里每个对象就是一个用户定义的 chunk
        commons: {
          name: 'commons',
          chunks: 'initial',
          // chunks(chunk) {  //  将文件名不为 c 的 入口 的公共代码打包为 common  的 chunk
          //   return chunk.name !== 'c';
          // },
          minChunks: 2
        }
      }
      // include all types of chunks
      // chunks: 'all'
    }
  }
}
