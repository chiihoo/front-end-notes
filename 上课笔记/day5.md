


          * 以下介绍各个标签
            * html
                * 对于xhtml页面来说，根元素可以是其它标签
                * 根标签 root element
                * 一个页面只能有一个
                * 没有的话，浏览器也会自动添加
                <!DOCTYPE HTML>
                <html></html>
                <html></html>
                {[() ()]}
            * head
                * https://github.com/joshbuchea/HEAD
                * 头部标签，放一些与页面相关的“元信息”，比如：
                    * 页面的编码方式
                        - `<meta charset="utf-8">`
                            + chartset：字符集
                            + meta：元
                        * 编码方式又是一个很大的话题
                        * 一般的乱码都是因为编码方式引起的
                    * 页面的标题，即title标签
                    * 页面的图标，即浏览器标题栏左边显示的那个小图标
                        - 页面图标可以用一个标签来设置
                            + `<link rel(ation)="icon" href="http://www.baidu.com/img/favicon.png">`
                            + 对于http://example.com/lksjdfasdfjasfd/asdfa/sdf/asd/fasdf/a.html
                            * http://example.com/favicon.ico
                        - 也可以不用一个标签设置，浏
览器会自动读取网站根目录下的favicon.ico这个文件
                            + 例如：http://www.baidu.com/favicon.ico
                    * 比如页面的样式表
                      * style/<link rel="stylesheet" href="a.css">
                    * 甚至页面可以在这里选择使用哪个引擎渲染
                        * 国产很多双核浏览器支持这种模式
                            - 浏览器普及
                        * <meta name="UA-X-Compatable" content="EDGE" />
                    * 在移动端，还可以定义页面以多宽的尺寸渲染等
                        - viewport,视口
                        - <meta name="viewport" content="width=500" />
                * head里的内容不会被显示在页面上
                * 不存在的话，也会自动添加
            * body
                * 想要在页面中被显示出来的内容都放在这个标签里面
                * 如果页面没有html或者body标签，浏览器会自动添加，并将页面内容包含在body里面
                    * 但浏览器同时也会将那些必须放在head里的标签放进head里面，比如title标签

                      ```html
                      <title>页面标题</title>
                      <h1>一级标题</h1>
                      <p>一个段落</p>
                      ```

                    * 上面的代码会被浏览器解析为下面的结构

                      ```html
                      <!-- <!doctype html> 这一行不会自动添加的 -->
                      <html>
                          <head>
                              <title>页面标题</title>
                          </head>
                          <body>
                              <h1></h1>
                              <p></p>
                          </body>
                      </html>
                      ```

                    * 同时，如果在body或者html标签的**结束标签之后**又出现了其它的标签，则之前的结束标签就会被认为无效，浏览器会自动添加结束标签

                      ```html
                      <html>
                          <head></head>
                          <body>
                              <div></div>
                          </body> 这行会被认为无效
                          <p></p>
                          <script></script>
                      </html>
                      <div></div>
                      ```

                    * 上面的代码相当于

                      ```html
                      <html>
                          <head></head>
                          <body>
                              <div></div>
                              <p></p>
                              <script></script>
                              <div></div>
                          </body>
                      </html>



                      ```

            * title
                * 页面标题
                * 仅支持纯文本，不支持嵌套其它标签
                * 如果不出现在head内，将自动移到head内
                * 出现多个的话，仅第一个生效
            * base 基准
                - `<base href="页面中所有相对路径的基准地址" target="页面中所有链接的打开位置">`
                    + href属性表示页面中所有**相对路径**的基础路径
                        * 一定要以/即目录结尾
                            - `<base href="https://www.baidu.com/abc/">`
                            - `<base href="https://www.baidu.com/abc">`相当于`<base href="https://www.baidu.com/">`
                    + target属性表示页面中**所有链接**的打开位置
                        * 当然，可以在页内的a标签中用它自己的target属性覆盖用base标签设置的全局打开位置
                - 有些框架等可能会利用这个特性
            * h1-h6 标签
                * header(标题) 1 到 6
                * 一级到六级标题
                * 默认情况下，标题上下会有一定的空白
                * 比较传统的观点认为一个页面不能出现超过一个h1标签，原因是为了 SEO
                    * SEO 是什么？
                        * Search Engine Optimism
                        * 搜索   引擎   优化
                            - 讲白了就是如何布置页面能让页面在搜索结果中尽量靠前
                            - 手段有很多种，请各们各行了解，SEO本身也是IT行业里一个专业的职位
                                + 如关键字
                                + 页面被引用的次数（反向链接数量）
                                  * 交换链接
                                + 使用https
                                + 使页面的html更符合语义
                * HTML5 中新增了 hgroup（即header group） 标签，大致用法如下：H5

                ```html
                <hgroup>
                    <h2>三体</h2>
                    <h3>一部人类文明的诗史</h3>
                </hgroup>
                ```
                    
                    * 即当不同级别的标题显示在一起的时候可以用这个标签把hN标签归类
                    * 一般来说，这个标签可以替换以前使用div的场景
            * p 标签
                * paragraph
                * 语意是一个段落，当想要表达一段话时都可以使用这个标签
                * 默认情况下也会有上下边距
            * a标签
                * anchor, 锚
                * 语义是一个链接，链接地址写在  href（Hyperlink REFerence）属性里
                    * 可以链接到的类型非常多，而且一般来说是可扩展的
                        * 绝对网址，fullpath
                            * `<a href="https://jd.com/">京东</a>`
                        * 页内特定位置跳转地址
                            * `<a href="#pos1"></a>`
                        * 其它页特定位置跳转地址
                            * `<a href="http://jd.com/#footer"></a>`
                        * 这个在书目的章节跳转在使用的比较多
                        * 相对路径
                            * <a href="https://baidu.com/">baidu</a>
                            * <a href="a.html">baidu</a>

                            * `<a href=".././../a/b/../index.html"></a>`
                            * `<a href="./index.html"></a>`
                            * `<a href="../index.html"></a>`
                              * http://a.com/a/b/c.html
                                * http://a.com/a/b/index.html
                                * http://a.com/a/index.html
                            * `<a href="/index.html"></a>`
                              * http://a.com/a/b/lkj/adsfa/sdf/c.html
                              * http://a.com/index.html
                        * 电子邮件
                            * `<a href="mailto:aaa@bbb.com"></a>`
                            * `<a href="mailto:aaa@bbb.com?title=1&subject=2&content=3"></a>`
                              * 需要在电脑安装邮件客户端
                        * 电话号码tel:18611075877
                          * 主要用在手机页面上
                        * QQ/taobao 临时会话
                          * tencent://temp-chat?QQ=285696737
                          * thunder://ghjk;adfklasdhfkweuhfasdlfk
                        * 等等等等
                            - thunder://LKDJOIE7436239/
                        * 空的href属性 href="" 
                            * 链接到当前页面
                                * 所以仅以#开头的值是中转到当前页面的特定位置
                            * <img src="">
                            * 类似的，如果一个img标签的src属性为空，也将对应当前页面地址
                                * https://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/
                * target属性
                    * 可以指定在哪个窗口打开链接
                        * 几个特殊值,关键字
                            * _blank，链接在空白的窗口显示，也就相当于新打开一个窗口了
                            * _self，其实这个是默认值，就是在当前窗体打开
                            * _parent，链接在父窗体显示
                            * _top，链接在顶层窗体显示
                        * 自定义值
                            * shopingcart，要求不能以_开头，出处：https://www.w3.org/TR/html-markup/datatypes.html#common.data.browsing-context-name-def
                            * 这点等讲到iframe等标签时再说
                                - _parent
                                - _top这两个属性也是需要讲到iframe时再提起

                * 在html5中，还有一个download属性
                    * 表示点击这个链接将下载链接对应的文件，而不是跳转到目标页面，下载的文件名以download属性的值来命名
                        * `<a href="xxx/jianai.pdf" download="简爱.pdf">点我下截《简爱》完整版</a>`
                        * 只能触发下载自己网站上的资源
                        * 问题，如果同时有target=“_blank”，又有download属性，它如何行为呢？
                            * 请自行测试
                        * 为什么要有这个属性呢？传统浏览器中，要触发下载，需要服务端的支持，给出特定的http头才会触发浏览器下载而不是打开对应的内容
                            * 这个属性的出现可以让点击下载完全由前端来完成
            * img 标签
                * image
                * 表示一张图片
                * 用src(source)属性表示图片的地址
                    * 同样也可以是绝对地址，相对地址
                        * `<img src="http://www.baidu.com/logo.png" alt="" title="tooltip">`
                        * `<img src="../abc.jpg" alt="">`
                        * `<img src="/abc.jpg" alt="">`
                        * <img srcset="a.jpg 1x, b.jpg 2x, c.jpg 3x">
                        * hd/a.jpg
                        * fhd/a.jpg
                        * 
                        * 1366*768
                        * 19吋，1440*900
                        * mac pro 1440*900  2880 * 1800 2k
                        * 1280*720/800
                        * 23， 1920*1080 -> 0.3mm 1
                        * 4k 1920*1080 3840*2160
                        * 5k 
                        * 2 笔记本屏幕
                        * 3 手机
                        * src指定的图片可以是浏览器支持的任意图片格式
                            * jpg/jpeg,png,bmp,gif,webp,svg,ico
                            * 注意psd格式应该是不支持的，因为它是photoshop专有的格式，支持它需要大量的代码而且psd格式的文件一般很大，一般都在几十M上下
                * 同时，用 alt 属性表示图片在加载失败时的替换文本
                    * 类似于markdown中图片的替换文档`![加载失败的替换文档](image source)`，事实上两者基本上是等同的
                    * alt 的全程是 alternative
                        * 自己查询这个单词的意思，就明白为啥用这个词了
                        * 键盘上的Alt键是这个单词的前缀，即alter
                * 可以使用width和height属性定义图片的宽和高
                    - 只写一个的话另一个会根据图片原始比例计算出来
                    - 图片一般来说有自己的宽高（natural width/height）
                    - 但是图片加载往往需要时间，而图片在加载完成之前浏览器是不知道其宽高的，所以就会产生页面抖动的问题
                    - 所以一般会在标签上把宽高写出来，这样图片加载过程中页面就不会抖动了
                * usemap="#themap"
                  * <map>
                       <area title="xxxx" href="xxx" shape="rect" coords="0,0,100,100">
                       <area title="xxxx" href="xxx" shape="circle" coords="0,0,100,100">
                       <area title="xxxx" href="xxx" shape="poly" coords="0,0,100,100">
                    </map>
                    - 可以让图片不同区域对应不同的链接
                    - 后面说到map标签后再说
            * span 标签
                * <p>aaa <span>bbb</span> ccc</p>
                * 是一个没有明确语义(通用语义)的标签
                * 一般来说想要给特定的内容加样式时可以用一个span标签将内容包起来
                    * 后面学到css就知道了
            * div


            * X
            * git Linus(Linux早期)
              * 毕业论文.doc
              * 毕业论文-修改版.doc
              * 毕业论文-再修改版.doc
              * 毕业论文-最终修改版.doc
              * 毕业论文-最终修改版2.doc
              * 毕业论文-最终修改版3.doc
              * 以管理毕业论文为需求提出需要记录文件变更过程的需求
                  * source control manager
                  * git-scm
              * 记录变更是一个很重要的功能，也很复杂
              * git config --global user.name "xieran"
              * git config --global user.email "xxx@qq.com"
              * git config --global alias.st status
              * git config --global alias.br branch
              * git config --global alias.co checkout
              * git config --global alias.ci commit
              * git init 在一个文件夹的.git文件夹下初始化一个仓库
              * git status 查看当前仓库的状态
              * git add file.txt 添加file.txt到待提交区
              * git add . 添加当前文件夹里的所有文件
              * git commit -m "提交信息"
              * git diff 显示被跟踪的文件的修改状态
              * git log 查看提交日志/历史
              * git merge
              * git push/pull
              * git push origin master
              * git remote
              * git fetch
              * git checkout
              * git branch

                https://<username>.github.io/可以访问到<username>.github.io这个仓库里的资源
                https://<username>.github.io/<repo_name>可以访问到repo_name这个仓库里的资源
