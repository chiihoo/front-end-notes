// 作业：实现JSON.parse函数，可以考虑输入的字符中没有任何多余的空白
// ParseJSON('{"a":[1,2,3]}') -> {a: [1,2,3]}
// ParseJSON('"foobar"') -> "foobar"
// ParseJSON('{"a":[1,2,3],"b":true,"c":{"d":1,"e":2.5}}') -> {"a":[1,2,3],"b":true,"c":{"d":1,"e":2.5}}

function parseJSON(str){
  let i=0;
  parseValue();
  function parseValue() {
    if (str[i] == '{') {
      return parseObject();
    }
    if (str[i] == '[') {
      return parseArray();
    }
    if (str[i] == '"') {
      return parseString();
    }
    if (str[i] == 't') {
      return parseTrue();
    } 
    if (str[i] == 'f') {
      return parseFalse();
    }
    if (str[i] == 'n') {
      return parseNull();
    }
  
    function parseArray() {
      let result = [];
      i++;
      while (1) {
        if (str[i] == ']') {
          i++;
          break;
        }
        if (str[i] == ',') {
          i++;
        }
        let value = parseValue();
        result.push(value);
        i++;
      }
      return result;
    }
    function parseObject() {
      let result = {};
      i++;
      while (1) {
        if (str[i] == '}') {
          i++;
          break;
        }
        if (str[i] == ',') {
          i++;
        }
        let key = parseString();
        i++;
        let value = parseValue();
        result[key] = value;
      }
      return result;
    }
    function parseString() {
      i++;
      let start = i;
      while (str[i] != '"') {
        i++;
      }
      let result = str.slice(start, i);
      i++;
      return result;
    }
    function parseTrue() {
      i += 4;
      return true;
    }
    function parseFalse() {
      i += 4;
      return false;
    }
    function parseNull() {
      i += 4;
      return null;
    }
    function parseNumber() {
      let start = i;
      while (isNumChar(str[i])) {
        i++;
      }
      let numStr = str.slice(start, i);
      return parseFloat(numStr);
    }
    function isNumChar(c) {
      return /^[0-9\.\+\-e]$/.test(c);
    }
  }
  return str;
}
let str = '{"a":[1,2,3]}';
let s=parseJSON(str);
console.log(s);


