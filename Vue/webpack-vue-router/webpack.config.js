const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') 

// 要看注释去webpack-study这个文件夹里看
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),   //vue-loader 15版本需指定plugin

  ],
  module: {
    rules: [
      {   //配置处理.css文件的第三方loader规则
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],//调用的顺序是从后往前调
      },
      {   //配置处理.less文件的第三方loader规则
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {   //配置处理.scss文件的第三方loader规则
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {   //处理图片路径的loader, cnpm install url-loader file-loader -D 
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=7500&name=[hash:8]-[name].[ext]',
      },
      {   //处理字体文件的loader
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader',
      },
      {   //配置Babel来把高级的ES语法转换成低级的ES语法
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {   //处理.vue文件的loader
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: { //配置在webpack中的vue导包路径
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
