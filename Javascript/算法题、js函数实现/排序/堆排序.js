//入口函数
function heapSort(arr, predicate = it => it) {
  if (arr.length <= 1) {
    return;
  }
  //默认创建一个最大堆，it=>-it则创建最小堆
  heapify(arr, predicate);

  //经过上述操作后，数组已经转化成最大堆或最小堆的形式，此时，数组首位为最大值或最小值，需要将首位与最后一位i=arr.length-1换位置
  //换位置之后，此时数组最后一位就不参与下一次运算了，index变为从下标0开始从上至下开始heapAdjust()
  for (let len = arr.length - 1; len >= 1; len--) {
    swap(arr, 0, len);
    heapAdjust(arr, 0, len, predicate);  //heapSize为(len=arr.length-1)--,然后从0的位置开始heapAdjust()
    // maxHeapAdjust(arr, 0, len);
    // minHeapAdjust(arr, 0, len);
  }
}


//创建一个最大堆或最小堆
function heapify(arr, predicate = it => it) {
  if (arr.length <= 1) {
    return;
  }
  //构建堆，能转化为最大堆或最小堆
  //递推公式就是 int root = i, int left = 2*i+1, int right = 2*i+2;
  //i为数组下标，root节点为数组中下标为i的数，root的左子节点为数组中下标为2i+1的数，root的右子节点为数组中下标为2i+2的数
  //先从最后一个节点和它的根节点开始，该根节点为在数组中的下标cursor为Math.floor(arr.length/2)
  let cursor = Math.floor(arr.length / 2) - 1;
  for (let i = cursor; i >= 0; i--) {   //从cursor节点开始，每层从后往前，从底至上的扫描
    heapAdjust(arr, i, arr.length, predicate);
    // maxHeapAdjust(arr, i, arr.length);
    // minHeapAdjust(arr, i, arr.length);
  }
}

//大小堆都能用，predicate能复用
//从index父节点自上往下的调整，也可以叫heapDown()
function heapAdjust(arr, index, heapSize, predicate = it => it) { //heapSize堆的最大长度，也就是数组的长度
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let maxIndex = index;//暂定index父节点最大
  //若index父节点的值比两个子节点都大，则直接下一个节点走起
  if (left < heapSize && predicate(arr[left]) > predicate(arr[maxIndex])) {
    maxIndex = left;
  }
  if (right < heapSize && predicate(arr[right]) > predicate(arr[maxIndex])) {
    maxIndex = right;
  }
  //如果index父节点的值比任一个子节点小，则把index父节点与最大值调换
  //若6 - 9 - 7调换后变为9 - 6 - 7,此时，6比7小，又需要调换，因此需要递归maxHeapAdjust(arr,heapSize,maxIndex);
  //  |                 |
  //  5                 5
  if (maxIndex != index) {
    swap(arr, index, maxIndex);
    heapAdjust(arr, maxIndex, heapSize, predicate);
  }
}

//数组元素交换
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


//这种写法不复用
//从index父节点自上往下的调整，也可以叫，maxHeapDown()和minHeapDown()
// 大堆顶      排出来的是从小到大
function maxHeapAdjust(arr, index, heapSize) { //heapSize堆的最大长度，也就是数组的长度
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let maxIndex = index;//暂定index父节点最大
  //若index父节点的值比两个子节点都大，则直接下一个节点走起
  if (left < heapSize && arr[left] > arr[maxIndex]) {
    maxIndex = left;
  }
  if (right < heapSize && arr[right] > arr[maxIndex]) {
    maxIndex = right;
  }
  //如果index父节点的值比任一个子节点小，则把index父节点与最大值调换
  //若6 - 9 - 7调换后变为9 - 6 - 7,此时，6比7小，又需要调换，因此需要递归maxHeapAdjust(arr,heapSize,maxIndex);
  //  |                 |
  //  5                 5
  if (maxIndex != index) {
    swap(arr, index, maxIndex);
    maxHeapAdjust(arr, maxIndex, heapSize);
  }
}
//小堆顶      排出来的是从大到小
function minHeapAdjust(arr, index, heapSize) {
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let minIndex = index;//暂定index根节点最小
  //若index根节点的值比两个子节点都小，则直接下一个节点走起
  if (left < heapSize && arr[left] < arr[minIndex]) {
    minIndex = left;
  }
  if (right < heapSize && arr[right] < arr[minIndex]) {
    minIndex = right;
  }
  //如果index根节点的值比任一个子节点大，则把index根节点与最小值调换
  //若7 - 5 - 6调换后变为5 - 7 - 6,此时，7比6大，又需要调换，因此需要递归maxHeapAdjust(arr,heapSize,minIndex);
  //  |                 |
  //  8                 8
  if (minIndex != index) {
    swap(arr, index, minIndex);
    maxHeapAdjust(arr, minIndex, heapSize);
  }
}



let arr = [1, 5, 7, 2, 35, 97, 67, 15, 12, 3, 36, 6, 47, 9, 51, 8, 21, 6, 75, 36, 10, 5, 87];
heapSort(arr, it => it); //最大堆,排出来从小到大
console.log(arr);
heapSort(arr, it => -it); //最小堆,排出来从大到小
console.log(arr);


// predicate = it => it只能比较数字
// 如果想要比较字母的话，可以使用compare = (a, b) => a - b; 更灵活


