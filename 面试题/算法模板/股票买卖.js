// 最多只能买卖一次股票
var maxProfit1 = function (prices) {
  let minPrice = Infinity
  let maxProfit = 0
  for (let i = 0; i < prices.length; i++) {
    // 如果当天价格低于最低价格，则赋值最低价格
    // 如果当天价格高于最低价格，则计算 当天价格 - 最低价格 的值，如果比最大利润还大的话，则赋值最大利润
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice
    }
  }
  return maxProfit
}

// 可以任意多次买卖股票
var maxProfit2 = function (prices) {
  let res = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1]
    }
  }
  return res
}

// 最多可以完成二笔股票交易

// 最多可以完成k笔股票交易
