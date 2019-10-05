// 写法一
function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  //left和right自身肯定是已经排好序的，每次比较两个数组的第一个数，就能得到这两个数组中的最小（大）值
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  while (i < left.length) {
    result.push(left[i++]);
  }
  while (j < right.length) {
    result.push(right[j++]);
  }
  return result;
}
//写法二
function merge(left, right) {
  let result = [];
  //left和right自身肯定是已经排好序的，每次比较两个数组的第一个数，就能得到这两个数组中的最小（大）值
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      /*shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right); //此时要么left为[],要么right为[]
}


//入口函数
function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

let a = [9, 2, 6, 4, 8, 10, 1, 3];
let b = mergeSort(a);
console.log(b);











// 不推荐这种写法,不太容易弄明白
// function mergeSort(arr) {
//   if (arr.length == 1) {
//     return;
//   }
//   let middle = Math.floor(arr.length / 2);
//   let left = arr.slice(0, middle);
//   let right = arr.slice(middle);

//   mergeSort(left);
//   mergeSort(right); //递归到底层

//   let i = 0;
//   let j = 0;
//   let k = 0;
//   while (i < left.length && j < right.length) {
//     if (left[i] < right[j]) {
//       arr[k++] = left[i++]; //必须用arr，改的是arr,mergeSort(left),实际改的是left
//     }
//     else {
//       arr[k++] = right[j++];
//     }
//   }
//   while (i < left.length) {
//     arr[k++] = left[i++];
//   }
//   while (j < right.length) {
//     arr[k++] = right[j++];
//   }
//   return arr;
// }


