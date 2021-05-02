// Combo url
// 页面page的主函数入口在page.js，以下为其依赖树。
// 为了性能要求，我们页面会组装一个combo请求：
// http://res.wx.qq.com/F.js,E.js,D.js,C.js,B.js,A.js,page.js
// 请设计genUrl(requireTree)，输出如上所示的combo url。requireTree的数据结构如下页。
requireTree = {
  name: 'page.js',
  require: [
    { name: 'A.js', require: [{ name: 'C.js', require: [{ name: 'F.js' }] }] },
    {
      name: 'B.js',
      require: [
        { name: 'D.js', require: [{ name: 'F.js' }] },
        { name: 'E.js', require: [] },
      ],
    },
  ],
}
/** * @param {object} requireTree * @return {string} */
var genUrl = function (requireTree) {
  // 填入代码
}
