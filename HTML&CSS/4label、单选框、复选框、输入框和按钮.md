
---
##### 单选框 checked默认选择
<form action="/submit-cat-photo">
  <label><input type="radio" value="Indoor" name="indoor-outdoor" checked> Indoor</label>
  <label><input type="radio" value="Outdoor" name="indoor-outdoor"> Outdoor</label>
</form>

---
##### 多选框 checked默认选择
<form action="/submit-cat-photo">
  <label><input type="checkbox" value="Loving" name="personality"> Loving</label>
  <label><input type="checkbox" value="Lazy" name="personality" checked> Lazy</label>
  <input type="checkbox" name="personality"> Energetic
</form>

---
##### 输入框和按钮 required代表必填
<form action="/submit-cat-photo">
  <input type="text" placeholder="cat photo URL" required>
  <button type="submit">Submit</button>
</form>

---
##### label标签：点击框后面的文字也可以

###### 显式方法

<from>
        <input type="radio" name="yes-no" id="yes">
        <input type="radio" name="yes-no" id="no">
</from> <br />
<label for="yes">点击这里也可选择 确定 选项</label> <br />
<label for="no">点击这里也可以选择 取消 选项</label> <br />

////////////////////////////////////////////////////////////

###### 隐式方法

<from>
    <label><input type="radio" name="yes-no">确定</label>
    <label><input type="radio" name="yes-no">取消</label>
</from>

