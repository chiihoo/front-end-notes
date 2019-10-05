

* markdown
  * 轻量
  * 是一种基本的**标记语言**（不是编程语言，不能表达逻辑，只能表达信息）
  * 内容是纯文本
  * 带格式的文本
  * 语法
    * 具体语法：文档：
      * N级标题
      * 段落
      * 链接 [linktext](url)
      * 图片 ![linktext](url)
      * 加粗，斜体等
      * 引用 >
      * 列表
        * 有序，无序
        * 层级
          * 最好使用 4 空格来缩进
      * 行内代码
      * 块级代码
        * 代码最好用代码块而不是缩进来表示，因为可以表达语言
      * 表格 vertical bar
        * | a | b | c |
        * |:---:|:---:|:---:|
        * | 1 | 2 | 3 |
      * 其它特殊格式，需要相应的软件支持
    * 软件
      + 浏览器插件
      + 在线编辑器
      + sublime插件
      + github支持
      + 有道云笔记



* sublime
  * package control
  * Emmet
  * Markdown
  * jsFormat
  * 增强的侧边栏
  * Doc Blockr
  * 增加的右键菜单
    * enhanced
  * 多行编辑
  * 配置文件









    * HTML Hyper Text Markup Language
      * 引入
        * 与markdown同为标记语言
        * 只不过标记的方式不一样
      * 嵌套规则
        * 与【数学公式】几乎一模一样
        * 树状（递归）结构
          * 其实我们会发现，递归结构在数学与计算机里出现的非常之多
            * 数学公式
            * 树木
            * 文件树
            * 编程语言的语法规则
            * 书籍的目录
            * 公司的组织架构
            * 房子
            * 都是树形结构
        - 标签
            * <div>lskdfj<span>woejfl</span>kjsdf</div>
            * <div>aaa<span>bbb</div>ccc</span>
            + <起始标签></结束标签>
            + <自闭合标签>
            + <自闭合标签 />
              * 空标签，void element/tag
              * self closing tag
            + 有些特定标签，即使里面是空的，也不能写成自闭合形式
              * script/iframe/canvas
              * <script src="xxx.js"> 
                  <div>您的浏览浏览器不支持js，请在设置中开启相应的功能</div>
              </script>
              * 歧义
            * 可访问性 accessibility
            * 语义化 secmentic
            + 在html5中，完全可以不用给自闭合标签打结束符 <br /> <br>
            + 事实上，即使是有些非自闭合标签（如p，li），在一些情况下也是可以省略结束标签的，**而且，是完全符合html标准的**
                * 这种场景一般是可以【推断出】此标签肯定已经结束了
                * 例如
                ```html
                <p>这是一个段落
                <p>这是另一个段落</p>
                <span>aaa</span>
                ```

                * w3的文档中对每一个标签在什么情况下可以省略结束标签都做了详细说明
                    - 例： https://www.w3.org/TR/html-markup/p.html
                * 一般不推荐省略结束标签，原因很简单，省略那么多，人会看不明白，也背不下来那么多规则
                * https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
      * 缩进 indent
          * 一般来说，现在前端社区里面都是缩进**两个空格**
              * 对于markdown，完全也可以只缩进两个空格，我之所以推荐大家缩进4个空格，主要是md有太多的查看器，效果各不兼容
          * 一个标签如果被一个标签包含在内，则它相对于这个标签缩进一个层级
          * 如果一个标签里面只有纯文字，则可以直接把文字包含在标签内而不缩进

            ```html
            <p>
              
            </p>
            <div>
                <ul>
                    <li>
                        <a>
                          <img src="a.jpg">
                        </a>
                    </li>
                    <li>
                        <a href="a.pdf">
                          点击下载
                        </a>
                    </li>
                    <li>
                      he<strong>ll</strong>o
                    </li>
                    <li></li>
                </ul>
                <p>aaabb sl</p>
                <p>
                    你在哪里呢
                    asdfkljsdlf
                    asdf
                    asdf
                    asdf
                </p>
                <p>我<span>在</span>这里</p>
            </div>
            ```

          * 一般来说，非**块级标签**（关于什么是块级标签，以后会提到）在内容不多的情况下可以选择不缩进，如

            ```html
            <div>
                <p>点击打开<a href="http://jd.com">京东</a></p>
            </div>
            ```

        * 不一定所有的标签都需要闭合
          * <hr> <hr/>
        * 语义化
          * 语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护。————维基百科
          * 说人话：合适的内容用合适的标签

          <div foo="ba'r" foz=baz contenteditable="true"  > </div>

          <input type="checkbox"    checked="checked">
          * 属性
              * 每一个标签可以接受一个或多个属性
              * 属性可以有值，也可以没有
              * 属性名不区分大小写，属性值区分大小写的
              * 属性的值一般使用双引号包起来
                * 也可以使用单引号
              * 但当属性的值里没有空格，引号等特殊字符时，属性值是**完全可以**不用引号包起来的
              * 如下列出一些，通用/全局属性(Global Attributes)，即可以用在所有元素上面且有实际意义
                  + id属性，在不学js的情况下，也可以有很多地方要用到
                      * 标签在整个页面唯一的值
                      * 一般来说起成一个单一的单词，不以数字开头，没有空格
                  + name属性，标签的名字，现在主要用在表单类标签上面
                  + title属性，鼠标在上面时显示的tooltip文本
                    * alt 属性，主要用在img标签上
                    * 指定在图片加载失败的时候的替换文本
                    * ![描述文本](url.jpg)
                    * <img alt="描述文本" src="url.jpg">
                    *
                    * alternative 可选项，替补，或者
                    * alternate
                    * alter 修改
                    * alert 警钟
                  + style属性，用于给标签指定内联样式
                  + class="foo bar" 类别
                    * 空格分隔的单词列表（word,foo-bar）
                    * comma separated list
                  + tabindex
                  + data-*
                    * <div isbn="567890">书籍详情</div>
                  + contenteditable(5)
                  + contextmenu(5)
                    * 需要js的支持
                  * 文档：https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
                    * Google：html Global Attributes
              * data-* 属性
              * 如何在html内表示这些用来表示html自身的字符呢
                * 如<>="
              * html entity
              - 转义(escape)：html entity HTML实体
                * &name;
                * &#number; 十进制数，&#25105; 我
                * &#xHHHH; 十六进制数,&#x6211;
                  * Hexdecimal
                * Unicode
                * 常见具名html实体：
                  * &nbsp; non-breaking space 160号空格
                  * &amp; &符
                  * &copy; 版权符
                  * &lt; 小于号 lettle then
                  * &gt; 大于号 greater then
                  * &quot; 双引号 quote
                  * &apos; 单引号
                  * 文档：
                    * Google： html entity
                    * https://dev.w3.org/html5/html-author/charref
                    * http://www.w3school.com.cn/html/html_entities.asp
                    * http://www.w3school.com.cn/tags/html_ref_entities.html
                    * [square bracket]
                    * {curly braces} mustcache
                    * (parentheses)
                    * ; semicolon
                    * : colon
                    * , comma
                    * . period
                    * / slash
                    * \ backslash
                    * ? question mark
                    * + plus
                    * * times star asterisk
                    * | vertical bar
                    * ! exclaimation
            * 对空白字符的忽略 我 我
              * 默认情况下浏览器忽略文字与文字之间多于一个的空格，换行符会被全部忽略
                * 当然css可以改变这种行为，后我们会看到
              * 所以下面的写法其实是一样的
                ```html
                abc <p>
                    <span> abc     def   </span>

              


                   a <i> foo bar

                    </i>
                </p>
                <pre>
                  
                </pre>
                ```

              * 上面的写当于下面的写法，【严格注意】空格
                  ```html
                  <p><span>abc def </span><i>foo bar</i></p>
                  ```
