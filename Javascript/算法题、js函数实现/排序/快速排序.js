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
// 因为在最后i===j时，基准值与arr[i]需要交换，如果是升序，则此时arr[i]必须是小于基准值的，才能满足换过去后，i左边的全比基准值小，i右边的全比基准值大
// 如果刚开始从左往右扫，找第一个大于基准数的值，到i与j相遇时，找到的值可能并没有小于基准值的情况
// 而如果刚开始就从右往左扫，找第一个小于基准数的值，到i与j相遇时，好的情况是找到的值小于基准值，坏的情况是扫到左边尽头，都没有找到，但是，此时i=j=left，就算交换也只是原地交换罢了

//如果要从大到小排列，只需要改成
// while(arr[j] <= key && i < j){
// 	j--;
// }
// while(arr[i] >= key && i < j){
// 	i++;       
// }
// 依旧先从右往左遍历
// 把大于小于号改成相反的就行


