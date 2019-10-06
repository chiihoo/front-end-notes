// main.js是项目的js入口文件
// cnpm install jquery -S  在当前目录本地安装jquery
import $ from 'jquery'  //es6语法
// const $ = require('jquery')

// 使用import语法，导入CSS样式表
import './css/index.css'
// import './css/index.less'
// import './css/index.scss'

// cnpm install style-loader css-loader less less-loader node-sass sass fibers sass-loader -D
// 注意：webpack默认只能打包处理js类型的文件，无法处理其他的非js类型的文件
// 如果要处理非js类型的文件，我们需要手动安装一些合适的第三方loader加载器
  // 1.如果想要打包处理css文件，需要安装 cnpm i style-loader css-loader -D 
  // 2.打开webpack.config.js这个配置文件，新增一个配置节点module，它是一个对象，有一个rules属性是个数组，存放了所有第三方文件的匹配和处理规则

// webpack处理第三方类型文件的过程：
  // 1.发现要处理的文件不是js文件，就去webpack.config.js配置文件中查找有没有对应的第三方loader规则
  // 2.如果能找到，就调用相应的loader处理这种类型
  // 3.调用loader的时候，是从后往前调用的
  // 4.当最后一个loader调用完毕，会把处理的结果直接交给webpack进行打包合并，最终输出到bundle.js中去

$(function () {
  $('li:odd').css('backgroundColor', 'lightblue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'D97634'
  })
})