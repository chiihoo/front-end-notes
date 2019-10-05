// main.js是项目的js入口文件
// cnpm install jquery -s  在当前目录本地安装jquery
import $ from 'jquery'  //es6语法
// const $ = require('jquery')

$(function () {
  $('li:odd').css('backgroundColor', 'lightblue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'D97634'
  })
})