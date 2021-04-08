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

ul.insertBefore(fragment, text) // 把fragment添加到text结点前面
ul.removeChild(ul.childNodes[0])
