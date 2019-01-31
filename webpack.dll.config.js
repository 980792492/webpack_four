const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV
module.exports = {
  entry: {
    vendor: [
     //提前打包一些基本不怎么修改的文件
    'react',
    'react-dom',
    'react-router-dom',
    'lodash',
    'babel-polyfill',
    'react-redux',
    'axios',
    'antd', 
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/public'), //放在项目的public目录下面
    filename: '[name].dll.js', //打包文件的名字
     /**
     * output.library
     * 将会定义为window.${output.library}
     * 在这次的例子中，将会定义为window.vendor_library
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
       // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
      context: process.cwd(),
      path: path.join(__dirname, 'dist/public', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),  
    //压缩 只是为了包更小一点 
    // new webpack.optimize.UglifyJsPlugin({
    //   workers: os.cpus().length,  // 多线程压缩
    //   compress: {
    //     warnings: false,   // 去掉警告
    //     drop_console:true,  //  去掉 console
    //     drop_debugger:true   // 去掉debugger
    //   },
    //   output:{
    //     // 去掉注释内容
    //     comments: false,
    //   },
    //   sourceMap: true
    // })
  ]
}