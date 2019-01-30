const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成Html插件
const CleanWebpackPlugin = require('clean-webpack-plugin') //   清空打包目录插件, clear 回滚有问题
// const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin')  // CSS文件单独提取出来, w4已经弃用，只对css文件生效
var WebpackMd5Hash = require('webpack-md5-hash')  // webpack的chunkhash根据文件内容生成hash
 
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  // entry: './src/index.js',
  entry: {
    vendor: [
      'react-dom',
      'react',
      'react-router-dom',
      'lodash',
      'antd'
    ], //  多页面所需的公共文件，防止重复打包
    app: './src/index.js',
    polyfills: './src/polyfills.js'
  },
  output: {
    // filename: 'bundle.js',
    // filename: '[name].bundle.js',
    // filename: '[name].[chunkhash].js', //  chunkhash 不可与 HMR 一起用
    // filename: '[name].[hash].js',
    chunkFilename: '[chunkhash].[id].chunk.js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: '/'   //  这里放的是静态资源CDN的地址
  },
  resolve: {
    // extensions: ['.js', '.less', '.json'],
    extensions: ['.js'],  //  指定js文件类型
    alias: { //  配置别名 加快webpack 查找模块速度,此处要思考  path.json() 和 path.resolve()的异同
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
        use: {
          // loader: 'babel-loader?cacheDirectory=true'
          loader: 'babel-loader',
          // options: {
          //   babelrc: false,
          //   presets: ['@babel/preset-env'],
          //   plugins: ['@babel/plugin-transform-runtime']
          // }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
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
    aggregateTimeout: 1000, // 防止重复保存频繁重新编译,1000毫秒内重复保存不打包
  //   poll: 1000 // 每秒询问的文件变更的次数
  },
  plugins: [
    // webpack添加webpack-md5-hash插件，这个插件可以让webpack的chunkhash根据文件内容生成hash，相对稳定
    // new WebpackMd5Hash(),
    //  多入口的html文件用 chunks这个参数来区分
    new HtmlWebpackPlugin({
      title: 'Output webpack four',
      filename: 'index.html',
      template: path.join(__dirname, 'template.html'), //   根据模版文件生成html文件，并将chunks的文件插入文件
      // chunks: ['index', 'vendor'],
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true// 压缩 去掉引号
      }
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Output webpack four2',
    //   filename: 'index2.html',
    //   template: path.join(__dirname, 'template2.html'),
    //   hash: true, // 防止缓存
    //   // chunks: ['index2', 'vendor'],  chunks的js文件塞到html文件中
    //   minify: {
    //     removeAttributeQuotes: true// 压缩 去掉引号
    //   }
    // }),

    // webpack3插件，Scope Hoisting，又译作“作用域提升”，文件体积更小，运行时创建函数作用域 更少， 开销更小
    // new webpack.optimize.ModuleConcatenationPlugin()  

    // 该插件可以显示出编译之前的文件和编译之后的文件的映射,为了减少生成文件的体积，
    // webpack 使用了标识符而不是文件名。在编译期，标识符是生成的，对于于模块的文件名，并放置于叫做 chunk manifest 的 JavaScript 对象中。
    // 它（带着一些启动代码）被置于入口模块中，对于被 webpack 打包的代码来说极其关键。问题与之前相同：当我们更改了代码的任何一部分，
    // 即使剩下的文件内容没有被修改，入口也会被更新以放入新的清单。这样反过来也就导致新的哈希值，影响了长期缓存。
    // 为了修复这个问题，我们应该使用 chunk-manifest-webpack-plugin 插件来把清单导出到单独的 JSON 文件中。
    // 这是更新后的 webpack.config.js，它会在构建目录下创建 chunk-manifest.json 文件
    new ManifestPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(), // 开启HMR 将使用模块的相对路径，而不是数字标识符，建议用于开发环境
    // new webpack.HashedModuleIdsPlugin(),  // 生产环境用，会根据模块的相对路径生成一个四位数的hash作为模块id
    // new ExtractTextWebapckPlugin('css/[name].[hash].css'), // 这个特性只用于打包生产环境，测试环境这样设置会影响HMR
    new webpack.HotModuleReplacementPlugin(), //  启用 HMR
    // new webpack.DefinePlugin({   //  允许创建一个在编译时可以配置的全局常量
    //   'process.env.NODE_ENV': JSON.stringify('local')
    // }),
    // new webpack.ProvidePlugin({
    //   join: ['lodash', 'join']   //  将lodash的join方法设置为 全局 join方法，不建议使用
    // }),
    // new webpack.LoaderOptionsPlugin({   //  该插件只用于迁移
    //   minimize: true     // loader 是否要切换到优化模式
    // })
    // new CopyWebpackPlugin([   // copy插件
    //   {
    //     from: path.resolve(__dirname, 'static'),
    //     to: path.resolve(__dirname, 'dist/static'),
    //     ignore: ['.*']
    //   }
    // ])

    // new webpack.ProvidePlugin({
    //   _: 'lodash' // 所有页面都会引入 _ 这个变量，不用再import引入，不建议使用
    // })
  ],
  optimization: { // 提取公用代码, 公共模块自动抽出来，变成一个包，前提是这个包大于 30kb
    splitChunks: {
      cacheGroups: {  // 该配置项  类似之前的 CommonChunks 实例， cacheGroups 里每个对象就是一个用户定义的 chunk
        commons: {
          name: 'commons',
          // chunks: 'initial',
          chunks(chunk) {  //  将文件名不为 c 的 入口 的公共代码打包为 common  的 chunk
            return chunk.name !== 'c';
          },
          minChunks: 2
        }
      }
      // include all types of chunks
      // chunks: 'all'
    }
  }
}
