  // 模版字符串

  //标签模板
  foo`${3}qwer\\t${2*5}yuiop${2+5}`
  // 可以转化为以下的函数调用 前面一部分是转义后的，raw是原始数据，第一个数组后面的是大括号里面的数
  // foo(['','qwer\t','yuiop','',raw=['','qwer\\t','y\uiop','']] ,3,10,7)
  
  function foo(literals,...substitutions){
    console.log(`literals:`,literals);
    //  =>literals: (4) ["", "qwer\t", "yuiop", "", raw: Array(4)]
    console.log(`substitutions:`,substitutions);
    // =>substitutions: (3) [3, 10, 7]
  }

  //粘贴到浏览器上运行