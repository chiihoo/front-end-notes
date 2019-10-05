//这题非常的懵比!
function sum(n, list, start) {
	if (n == 1) {
		if (total == 1) {
			console.log(total + '=' + 1);
			return;
		}
		console.log(total + '=' + list.join('+') + '+1')
	} else {
		for (let i = start; i <= n / 2; i++) {
			list.push(i)
			sum(n - i, list, i)
			list.pop()
		}
		list.length && console.log(total + '=' + list.join('+') + '+' + n)
	}
}
const total = 5
sum(total, [], 1)


