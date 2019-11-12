/**
 * @param {string} expression
 * @return {boolean}
 */

// 方法一:直接解析
var parseBoolExpr = function(expression) {
  let i = 0
  return parse()

  function parse() {
    if (expression[i] == 't') {
      i++
      return true
    }
    if (expression[i] == 'f') {
      i++
      return false
    }
    if (expression[i] == '!') {
      return parseNot()
    }
    if (expression[i] == '&') {
      return parseAnd()
    }
    if (expression[i] == '|') {
      return parseOr()
    }
  }

  function parseNot() {
    i += 2
    let value = parse()
    i++
    return !value
  }

  function parseAnd() {
    i += 2
    let result = true
    while (true) {
      let value = parse()
      result = result && value
      if (expression[i] == ')') {
        i++
        break
      }
      if (expression[i] == ',') {
        i++
      }
    }
    return result
  }

  function parseOr() {
    i += 2
    let result = false
    while (true) {
      let value = parse()
      result = result || value
      if (expression[i] == ')') {
        i++
        break
      }
      if (expression[i] == ',') {
        i++
      }
    }
    return result
  }
}

// 方法二:解析语法树
var parseBoolExpr = function(expression) {
  var i = 0
  var tree = parse()
  return run(tree)
  // return compile(tree)
  // return compile2(tree)

  // //后缀表达式     (只是转化,不能做这题)
  // function compile2(tree) {
  //   if (tree.type == 'literal') {
  //     if (tree.value) {
  //       return 'true'
  //     } else {
  //       return 'false'
  //     }
  //   }
  //   if (tree.type == 'fcall') {
  //     if (tree.name == '!') {
  //       return compile2(tree.parameters[0]) + ' not'
  //     }
  //     if (tree.name == '&') {
  //       return tree.parameters.map(compile2).join(' ') + ' and'
  //     }
  //     if (tree.name == '|') {
  //       return tree.parameters.map(compile2).join(' ') + ' or'
  //     }
  //   }
  // }

  // //前缀表达式     (只是转化,不能做这题)
  // function compile(tree) {
  //   if (tree.type == 'literal') {
  //     if (tree.value) {
  //       return 'true'
  //     } else {
  //       return 'false'
  //     }
  //   }
  //   if (tree.type == 'fcall') {
  //     if (tree.name == '!') {
  //       return 'not(' + compile(tree.parameters[0]) + ')'
  //     }
  //     if (tree.name == '&') {
  //       return 'and(' + tree.parameters.map(compile).join(',') + ')'
  //     }
  //     if (tree.name == '|') {
  //       return 'or(' + tree.parameters.map(compile).join(',') + ')'
  //     }
  //   }
  // }

  //求一个语法树的结果
  function run(tree) {
    if (tree.type == 'literal') {
      return tree.value
    }
    if (tree.type == 'fcall') {
      if (tree.name == '!') {
        return !run(tree.parameters[0])
      }
      if (tree.name == '&') {
        return tree.parameters.map(run).every(it => it == true)
      }
      if (tree.name == '|') {
        return tree.parameters.map(run).some(it => it == true)
      }
    }
  }

  //解析一个布尔表达式为一个语法树
  function parse() {
    if (expression[i] == 't') {
      i++
      return {
        type: 'literal',
        value: true
      }
    }
    if (expression[i] == 'f') {
      i++
      return {
        type: 'literal',
        value: false
      }
    }
    if (expression[i] == '!') {
      return parseNot()
    }
    if (expression[i] == '&') {
      return parseAnd()
    }
    if (expression[i] == '|') {
      return parseOr()
    }
  }

  //解析一个非运算为一个布尔值
  function parseNot() {
    var result = {
      type: 'fcall',
      name: '!',
      parameters: []
    }
    i += 2
    var tree = parse()
    i++
    result.parameters.push(tree)
    return result
  }

  function parseAnd() {
    var result = {
      type: 'fcall',
      name: '&',
      parameters: []
    }
    i += 2

    while (true) {
      var tree = parse()
      result.parameters.push(tree)
      if (expression[i] == ')') {
        i++
        break
      }
      if (expression[i] == ',') {
        i++
      }
    }
    return result
  }

  function parseOr() {
    var result = {
      type: 'fcall',
      name: '|',
      parameters: []
    }
    i += 2
    while (true) {
      var tree = parse()
      result.parameters.push(tree)
      if (expression[i] == ')') {
        i++
        break
      }
      if (expression[i] == ',') {
        i++
      }
    }
    return result
  }
}
