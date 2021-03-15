function x(num) {
  if (num < 2) {
    return num
  } else {
    // console.log(num,Math.floor(num / 2),num % 2)
    return x(Math.floor(num / 2)) + String(num % 2)
  }
}
x(9)