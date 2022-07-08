let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
// let target = [
//   {
//     id: 1,
//     name: '部门1',
//     pid: 0,
//     children: [
//       { id: 2, name: '部门2', pid: 1, children: [] },
//       {
//         id: 3,
//         name: '部门3',
//         pid: 1,
//         children: [
//           {
//             id: 4,
//             name: '部门4',
//             pid: 3,
//             children: [
//               {
//                 id: 5,
//                 name: '部门5',
//                 pid: 4,
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]

function format(arr) {
  let obj = {}
  let res = []

  for (let item of arr) {
    obj[item.id] = { ...item, children: [] }
  }

  for (let item of arr) {
    let { id, pid } = item
    if (pid === 0) {
      res.push(obj[id])
    } else {
      obj[pid].children.push(item)
    }
  }
  return res
}

console.log(format(arr))
