**可以在图片上画形状，点击这块的图形可以进行跳转**

* map
    - 不是“地图”标签，是“映射”标签
    - name属性
    - 如果设置id属性的话，id跟name属性值必须一样
        * <input type="radio" name="a" id="a1">
          <input type="radio" name="a" id="a2">
          <input type="radio" name="a" id="a3">
          <input type="radio" name="a" id="a4">
          <input type="radio" name="a" id="a5">
* area
    - 必须做为map的子元素
    - w3school上的错误示范：http://www.w3school.com.cn/tags/att_img_usemap.asp
    - 属性
        + href
        + target
        + alt
        + 以上三个属性同a标签
        + shape
            * rect(angle)，矩形
                - x1,y1,x2,y2
            * circle，圆形
                - cx,cy,r
                - 圆心x，圆心y
                - 半径r
            * poly(gon)，多边形
                - 至少6个值，表示一个多边形的若干个顶点
        + coords coordinate
            * 对应shape的几种图形的坐标
        + code
          ```html
          <img title="image title" src="https://drscdn.500px.org/photo/174778125/m%3D1170_k%3D1/2841ccf2a3720e8e794a6a6930f6ff2c" width=300 usemap="#somemap" alt="">
          
          <map name="somemap">
            <area shape="rect" coords="55,108,205,200" href="https://www.mi.com/" alt="ieksoef" title="abc" target="_blank">
            <area shape="circle" coords="133,262,90" href="" alt="">
            <area shape="poly" coords="57,82,8,265,163,397,225,256,187,83" href="" alt="">
          </map>
          ```