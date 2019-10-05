**iframe可以在页面中内嵌别的网页**

* iframe
    - inline frame
    - 必须有开始标签和结束标签
        + 可以在标签之间写上不支持此标签时的退化内容
    * 各种属性
        - src
        - name
            + 提及a标签的target属性
              * _self, _blank
              * _top, _parent
              * 自定义名字
            * 以前常用来做导航
            * base, a, form, img + map>area
        - sandbox
    * webview
    * 它的跳转记录也会存在于浏览器的前进后退的记录里面
    * code
      ```html
      <p>this is frame 4</p>
      <iframe src="frame3.html" frameborder="1">
        your browser don't support iframe
      </iframe>
      <p>this is frame 4 </p>
      ```
      ```html
      <p>this is frame 3</p>
      <iframe src="frame2.html" frameborder="1"></iframe>
      <p>this is frame 3 </p>
      ```
      ```html
      <p>this is frame 2</p>
      <iframe src="frame1.html" frameborder="1"></iframe>
      <p>this is frame 2 </p>
      ```
      ```html
      <a href="http://mi.com/" target="_top">mi</a>
      ```

**frameset几乎不用，它可以把页面分块**

* frameset&frame
    - rows/cols="10%,50px,*"
    - noframes
    - code
      ```html
      <frameset rows="100px,*,100px">
        <frame src="https://www.jd.com/">  
        <frameset cols="50,50">
          <frame src="https://www.jd.com/">
          <frame src="https://www.jd.com/">
        </frameset>
        <frame src="https://xieranmaya.github.io/">
      </frameset>
      <noframes>您的浏览器不支持框架</noframes>
      ```

      ```html
      <frameset>
          <frame>
      </frameset>
      <noframes>您的浏览器不支持框架</noframes>

      <canvas>
          <p>no supported</p>
      </canvas>

      <script>
        var a = 8
      </script>
        <noscript>your browser dont support javascript!</noscript>

      <iframe src="" frameborder="0">
           <p>no supported</p>
      </iframe>

      fallback 退化方案
      degrade 降级方案
      backdrop 备用方案

      <script>
          alert()
      </script>
      <noscript>
        <p>woiejflksdjafoiw</p>
      </noscript>
      ```