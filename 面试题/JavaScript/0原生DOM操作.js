let ul = document.createElement('ul')
ul.setAttribute('class', 'c1') // 会覆盖
ul.className = 'c2' // 会覆盖
ul.classList.add('c3') // 不会覆盖

console.log(ul.getAttribute('class'))

let fragment = document.createDocumentFragment()

for (let i = 0; i < 5; i++) {
  let li = document.createElement('li')
  fragment.append(li)
}

let text = document.createTextNode('文本结点')
ul.appendChild(text)

ul.append('文本')
// append可以传入多个节点或字符串
// append只能传一个节点，不能传字符串，但是可以用createTextNode创建文本节点代替

ul.innerHTML = '<li>5</li>'
ul.innerText = '666'

ul.insertBefore(fragment, text) // 把fragment添加到text结点前面
ul.removeChild(ul.childNodes[0])
