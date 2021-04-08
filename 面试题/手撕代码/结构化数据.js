// 字符串有小写字母、|、[和]构成，且不会包含多余空格
// 'abc' => {value : 'abc}

// '[abc[bcd[def|xxx]]]' =>
// {
//   value: 'abc',
//   children: [
//     {
//       value: 'bcd',
//       children: [{ value: 'def' }, { value: 'xxx' }]
//     }
//   ]
// }



