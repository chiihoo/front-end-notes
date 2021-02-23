// 各个排序算法的复杂度 https://img-blog.csdn.net/20170406122131723
// 1.冒泡排序：时间复杂度O(n^2) 空间复杂度O(1)
// 2.快速排序：需要递归，时间复杂度O(nlog(n)) 空间复杂度为递归的深度O(log(n))，最坏情况下为O(n)

// 3.归并排序：需要递归，时间复杂度O(nlog(n)) 空间复杂度为临时数组占用空间n+递归深度log(n)，故为O(n)

// 4.插入排序：时间复杂度O(n^2) 空间复杂度O(1)
//        ——> 不断遍历<已排序序列>，找到合适位置，插入
//            拿到未排序序列的第一个数，遍历已排序序列，找到第一个比它大的或第一个比它小的，插入到该位置，并把后续数字都往后移一位。
//            实现的时候，可以从未排序序列的第一个数开始，从后往前遍历，两两比较，换位，就避免了多余的移位操作
// 5.希尔排序：时间复杂度O(n^1.3) 空间复杂度O(1)

// 6.选择排序：时间复杂度O(n^2) 空间复杂度O(1)
//        ——> 不断遍历<未排序序列>，找到最大或最小的数，排在已排序序列的后面
// 7.堆排序：  时间复杂度O(nlog(n)) 空间复杂度O(1)

// 8.计数排序
// 9.桶排序
// 10.基数排序

// 时间复杂度为O(nlog(n))的：快速排序、归并排序、堆排序

// 数据量小用快排，数据量大用堆排序

// 稳定的排序算法：冒泡排序、插入排序、归并排序

// 1.冒泡排序
function bubbleSort(arr) {
  // 升序
  // 外层循环记录了进行完整冒泡过程的次数，当前进行的次数为i + 1次
  for (let i = 0; i < arr.length; i++) {
    // 内层循环为从前往后依次进行冒泡
    // 内层循环都会从下标0开始往后两两比较，最后把最大值挪到最后的一个位置
    // 但是由于一次次的从前往后的冒泡过程会依次使最大值、第二大值、第三大值等排到后面，因此最后面的i + 1个数就不用再进行排序了
    // 即在第i + 1次循环时，只需交换到j < arr.length - (i + 1)即可
    for (let j = 0; j < arr.length - i - 1; j++) {
      //
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('bubbleSort', bubbleSort(arr))

// 2.快速排序
// https://blog.csdn.net/starlet_kiss/article/details/86010904
// 升序，就是<先从右往左扫!>，找到第一个小于基准数的，再从左往右扫，找到第一个大于基准数的，之后交换这两个数，再继续进行扫描
// 扫描到左右指针相遇时，也就是i === j时，交换基准值与arr[i]，之后继续排序 left ~ i-1 与 i+1 ~ right 区间
// 注意：如果基准值选在最左边的值，那么必须要<先从最右边开始往左扫>，再从左往右扫，这个顺序不能乱
// 因为在最后i===j时，基准值与arr[i]需要交换，如果是升序，则此时arr[i]必须是小于基准值的，才能满足换过去后，i左边的全比基准值小，i右边的全比基准值大
// 如果刚开始从左往右扫，找第一个大于基准数的值，到i与j相遇时，找到的值可能并没有小于基准值的情况
// 而如果刚开始就从右往左扫，找第一个小于基准数的值，到i与j相遇时，好的情况是找到的值小于基准值，坏的情况是扫到左边尽头，都没有找到，但是，此时i=j=left，就算交换也只是原地交换罢了
function quickSort(arr1) {
  function helper(arr, left, right) {
    // 递归退出条件
    if (left > right) {
      return
    }
    // 最左边的数字为基准数
    let key = arr[left]
    let i = left
    let j = right
    while (i < j) {
      // 先从右往左扫，直到找到第一个小于key的值，所以条件需要是符合arr[j] >= key的就j--
      // 记住一定要先从右往左扫！
      while (i < j && arr[j] >= key) {
        j--
      }
      // 从左往右扫，直到找到第一个大于key的值
      while (i < j && arr[i] <= key) {
        i++
      }
      // 交换这两个值
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    // 最后i===j，此时交换arr[i]与基准数的值
    arr[left] = arr[i]
    arr[i] = key
    helper(arr, left, i - 1)
    helper(arr, j + 1, right)
  }
  let arr = [...arr1]
  helper(arr, 0, arr.length - 1)
  return arr
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('quickSort', quickSort(arr))

// 3.归并排序
// https://images2015.cnblogs.com/blog/1024555/201612/1024555-20161218163120151-452283750.png
function mergeSort(arr) {
  // merge函数的作用是把两个有序数组合并成一个排序数组
  function merge(leftArr, rightArr) {
    let res = []
    let i = 0
    let j = 0
    // 升序
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        res.push(leftArr[i++])
      } else {
        res.push(rightArr[j++])
      }
    }
    // 此时其中一个数组已经全部排完，现在把另一个的剩余部分排列进
    while (i < leftArr.length) {
      res.push(leftArr[i++])
    }
    while (j < rightArr.length) {
      res.push(rightArr[j++])
    }
    return res
  }

  // 主要的排序函数，先把arr一次次递归拆分成一半->一半->一半，直到拆成长度为1，之后再进行merge合并操作
  function sort(arr) {
    // 递归退出条件
    if (arr.length <= 1) {
      return arr
    }
    let mid = Math.floor(arr.length / 2)
    let leftArr = sort(arr.slice(0, mid))
    let rightArr = sort(arr.slice(mid))
    return merge(leftArr, rightArr)
  }

  return sort(arr)
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('mergeSort', mergeSort(arr))

// 4.插入排序
// 遍历已排序序列，找到合适位置，插入
// 升序
function insertSort(arr) {
  // 外层循环从前往后遍历
  for (let i = 1; i < arr.length; i++) {
    // 内层循环从下标i开始往前遍历，0到i-1的区间是有序的，每次两两比较，如果后面的比前面小，那么交换两者的位置，否则说明已经将arr[i]交换到了合适的位置，再接着下一次外层循环
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('insertSort', insertSort(arr))

// 5.希尔排序（缩小增量排序，是对直接插入排序做的一个改进，直接插入排序它的增量为1）
// 利用分组粗调的方式减少了直接插入排序的工作量 https://blog.csdn.net/csdnsevenn/article/details/100787856
// (1) 设置gap序列即增量序列，最后一次gap必须是1
// (2) 将相距gap的一组数按照插入排序（注意 插入排序从第二个开始）
// (3) 插入排序 增量为gap 而不是1
function shellSort(arr) {
  // 增量为 gap=Math.floor(arr.length / 2)，缩小增量为 gap = Math.floor(gap / 2)
  // 20个数 gap为 10 5 2 1
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 下面跟插入排序差不多，只是把 i = 1 换成了 i = gap，把 j - 1 换成了 j - gap。插入排序里面 j > 0 实际上是 j - 1 >= 0，跟这里一样
    for (let i = gap; i < arr.length; i++) {
      for (let j = i; j - gap >= 0; j = j - gap) {
        if (arr[j] < arr[j - gap]) {
          ;[arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
        } else {
          break
        }
      }
    }
  }
  return arr
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('shellSort', shellSort(arr))

// 6.选择排序
// 不断遍历未排序序列，找到最小值对应位置，放到已排序序列最后面
// 升序
function selectSort(arr) {
  // 外层循环从前往后遍历
  for (let i = 0; i < arr.length - 1; i++) {
    // 暂定最前面的i为最小值下标
    let minIndex = i
    // 内层循环遍历i后面的值，找出最小值对应的下标
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    // 将找到的最小值与下标i对应的值进行替换
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('selectSort', selectSort(arr))

// 7.堆排序
// https://images2017.cnblogs.com/blog/849589/201710/849589-20171015231308699-356134237.gif
// 升序用大根堆，降序用小根堆，因为最后要用根结点与当时最后一个结点(会--)进行交换
function heapSort(arr) {
  // 堆调整
  // index为某一个父结点的索引，如果这个父结点比两个子结点都要大的话，就调整完毕
  // 否则，记录其中一个比父结点大的子结点的索引，并将它与父结点互换位置，之后从交换之前这个子结点的位置开始继续向下搜索
  function heapAdjust(index, heapSize) {
    // index为某个父结点索引, 2*index+1为左子结点的索引，2*index+2为右子结点的索引
    let left = 2 * index + 1
    let right = 2 * index + 2
    let maxIndex = index // 暂定为父结点最大
    // 这里只是选中任意一个比父结点大的子结点
    // 这里是大根堆，求升序的。如果要小根堆，只需要 arr[left] < arr[maxIndex] 与 arr[right] < arr[maxIndex] 即可
    if (left < heapSize && arr[left] > arr[maxIndex]) {
      maxIndex = left
    }
    if (right < heapSize && arr[right] > arr[maxIndex]) {
      maxIndex = right
    }
    // 如果存在比父结点大的子结点，此时的maxIndex就是子结点的索引，交换位置，并继续向下搜索
    if (maxIndex !== index) {
      ;[arr[index], arr[maxIndex]] = [arr[maxIndex], arr[index]]
      heapAdjust(maxIndex)
    }
  }

  // 创建大根堆
  // 怎么创建呢？从最后一个结点的父结点开始，往前遍历，调用headAdjust。其中最后一个结点的父结点的索引为Math.floor(arr.length / 2)
  // 而headAdjust函数是从遍历的那个结点开始向下搜索，如果子结点比父结点大，则将其中一个比父结点大的子结点与父结点互换位置，再向下搜索
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapAdjust(i, arr.length)
  }

  // 现在已经创建好了大根堆，根结点为最大值，将根结点与最后一个值互换位置，目前最后一个值就是最大值了，但此时堆不是大根堆了，因此需要一次堆调整
  // 但这次堆调整需要把最后一个值排除掉，因为最后一个值已经排序完毕了，即heapSize为arr.length - 1
  // 调整完之后，根结点又为当前最大值了，将根结点与倒数第二个值互换位置，以此类推
  for (let i = arr.length - 1; i >= 1; i--) {
    // 第一次i=arr.length-1，为最后一个结点，与根结点交换位置
    ;[arr[i], arr[0]] = [arr[0], arr[i]]
    // 之后要进行堆调整，但这里的heapSize就不是arr.length，需要-1，恰好就是i
    heapAdjust(0, i)
  }
  return arr
}
// let arr = [7, 2, 5, 6, 7, 8, 1]
console.log('heapSort', heapSort(arr))

// 8.计数排序
// 9.桶排序
// 10.基数排序
