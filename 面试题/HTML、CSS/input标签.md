name属性：元素的名称，也就是name的值代表当前input元素的名字；

value属性：元素的默认值
1）当input type=“text”、“password”、"hidden"时，定义输入字段的初始值；
2）当input type=“button”、“reset”、"submit"时，定义按钮上的显示的文本；
3）当input type=“checkbox”、“radio”、"image"时，定义与输入相关联的值；
注意：input type="checkbox"和input type="radio"中必须设置value属性；value属性无法与input type="file"一通使用。

style属性：为input元素设定CSS样式；
width属性：当input type="image"时，通过width属性控制元素的宽度；
height属性：当input type="image"时，通过height属性控制元素的高度；
maxlength属性：定义input元素中可输入的最长字符数。







```
<input type="checkbox" checked="true" value='茄子'/>
checkbox复选框，checked用于选中状态，而value用于表单状态的提交
```



```
<input type="radio" name="colors" id="red" value="red">红色<br>
<input type="radio" name="colors" id="blue" value="blue">蓝色<br>
<input type="radio" name="colors" id="green" value="green">绿色

radio单选框，name相同的为一组，每次只能选择一个
```

