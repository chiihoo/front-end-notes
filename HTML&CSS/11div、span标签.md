div与span区别：
div占用的位置是一行，
span占用的是内容有多宽就占用多宽的空间距离。


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    .abs{
        color:green;
    }
    .abs span{
        color:blue;
    }
  </style>
</head>
<body>
<div class="abs">span的内容是:<span>this is span</span></div>
</body>
</html>