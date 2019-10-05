function quicksort(arr,left,right) {
	let i, j, key;
	if(left > right){
		return;
	}
	key = arr[left]; //key中存的就是基准数
	i = left;
	j = right;
	while(i != j) { //顺序很重要，要先从右边开始找
		while(arr[j] >= key && i < j){
			j--;
		}
		while(arr[i] <= key && i < j){//再找右边的
			i++;       
		}
		if(i < j)//交换两个数在数组中的位置
		{
			let temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	//最终将基准数归位
	arr[left] = arr[i];
	arr[i] = key;
	quicksort(arr, left, i-1);//继续处理左边的，这里是一个递归的过程
	quicksort(arr, i+1, right);//继续处理右边的 ，这里是一个递归的过程
}
let arr=[2,1,5,7,96,14,562,422,45,3,4,47,5,2];
quicksort(arr,0,arr.length-1);
console.log(arr);

// 只要以最左边为基准数，就必须先从右边开始遍历，整体遍历完成后在下标i左边的数都小于arr[i]，右边的都大于arr[i],
// 给变量i,j起名"哨兵i,j"。如果先出动哨兵i，显然哨兵i先到达“相遇数”，因为哨兵i只会在大于基准数的位置停下，
// 这就意味着“相遇数”一定是大于基准数，那么交换后左边序列最左边的元素一定大于归位后的基准数了，
// 与快排一趟结束后，基准数大于左边子序列元素矛盾。

//如果要从大到小排列，只需要改成
// while(arr[j] <= key && i < j){
// 	j--;
// }
// while(arr[i] >= key && i < j){
// 	i++;       
// }
// 依旧先从右往左遍历
// 把大于小于号改成相反的就行


