module.exports = function add(a, b) {
  console.log('在导入的文件中，add函数是赋值给module.exports')
  return a + b
}
module.exports.add = function(a, b) {
  console.log('在导入的文件中，add函数是赋值给module.exports.add')
  return a + b
}
// 我在自定义的_require中给code加了return语句, var code = readFileContent(path)+'\n return module.exports;'
// 因此这里不要写 return module.exports
