* table标签
    - 这个标签以前经常用于做布局
        + 什么是布局？即页面大区块的排列和摆放
        + 为什么呢？因为table都是方方正正格子，了解后很容易控制
            * 语义很差
            * 可读性很差
            * 可维护性也很差 maintainable
            * 可访问性
        + 但现在有了 css 之后，基本上只用table来显示数据，即表格本来的作用
        + 熟悉 DIV+CSS 布局 JD Job Description
    * caption
        - 表格标题
    * thead
        - 表头
        - 做为table的直接子元素
        - 只能有一个
        - 只有一个的情况下，即使出现在tbody的后面，其内容也会显示在tbody的前面
        - 非要写多个的话，第一个以外的会当做tbody来处理
    * tbody
        - 表格主体
        - 做为table的直接子元素
        - 可以有多个
    * tfoot
        - 表尾
        - 做为table的直接子元素
        - 只能有一个
        - 只有一个的情况即使出现在tbody的前面面，它的行也出现在tbody的后面
        - 非要写多个的话，第一个以外的会当做tbody来处理
    * tr
        - table row cell
        - 表格行
        - 可以直接做为table的子元素，会被放入创建的tbody里面
        - 或者做为上面三个标签(thead/tbody/tfoot)的子元素
    * th
        - table header cell
        - 用在表头单元格
        - 文字默认为加粗
        - id用于被td元素引用以表示td所属的标题是哪一个
            + 看例子
    * td
        - table data，表格数据单元格
        - headers
            + 表格头，值为某th的id，以表示这个数据的名称
                * 方便读屏软件
            + headers的值可以是多个以空格分隔的th的id的值，用法可能是th或td单元格跨行或跨列了
        - 跨行跨列的单元格
            + col span 跨列
            + row span 跨行
            + 错误的示范：
            + http://www.splaybow.com/html-table-rowspan-colspan.shtml
        - http://jsbin.com/nikifi/edit?html,output
        - http://jsbin.com/yehecez/edit?html,output
        - http://jsbin.com/susomoh/1/edit?html,output
    * col/colgroup 标签
        - colgroup
            + 用来分组col标签
            + span属性，表示选择多列表格
            + 有span时，不可再有子的col元素
            + 大部分属性同col元素
        - col
            + 用来设置表格列的属性和样式
            + span属性，表示选择多少列表格列，默认为1
        - 可以单独使用，也可以被colgroup分组
          ```html
          <table>
              <caption>表格标题</caption>
              <col>
              <col>
              <colgroup></colgroup>
              <colgroup></colgroup>
              <colgroup bgcolor=red>
                  <col>
                  <col bgcolor=navy>
              </colgroup>
              <tbody>
                <tr bgcolor="red">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
          </table>
          ```
        - 必须出现在caption后面，thead/tbody前面
        - 很多属性不支持了
            + 而w3schools上面还列着
            - http://www.w3school.com.cn/tiy/t.asp?f=html_col_test
    * 其它
    * border-spacing CSS属性, spacing是重合的
    * cellspacing=0
    * tr或者td or th不能有其它并列标签,否则会识别错误
        * 有些元素的 position:relative 无效，见下
        * https://stackoverflow.com/questions/6746175/html-tr-tag-and-positionrelative
        * box-shadow 也不支持某些类型的元素
        * https://stackoverflow.com/questions/10874985/box-shadow-on-table-row-not-appearing-on-certain-browsers

<table border="1">
<tr>
    <td>01</td>
    <td rowspan="3">02</td>
    <td>03</td>
    <td>04</td>
</tr>
<tr>
    <td>01</td>
    <td colspan="2">02</td>
</tr>
<tr>
    <td>01</td>
    <td>02</td>
    <td>03</td>
</tr>
<tr>
    <td colspan="2">01</td>
    <td>02</td>
    <td>03</td>
</tr>

</table>

---

<table border="1">
<tr>
  <td>01</td>
  <td colspan="3">02</td>
  <td rowspan="3">03</td>
  <td>04</td>
</tr>
<tr>
  <td rowspan="2">01</td>
  <td rowspan="3">02</td>
  <td rowspan="2" colspan="2">03</td>
  <td rowspan="2">04</td>
</tr>

下面这行必须带，不然表格乱了
<tr>
</tr>

<tr>
  <td>01</td>
  <td colspan="3">02</td>
  <td>03</td>
</tr>

<tr>
  <td>01</td>
  <td>02</td>
  <td>03</td>
  <td>04</td>
  <td>05</td>
  <td>06</td>
</tr>
