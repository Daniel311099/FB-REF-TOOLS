const a = {a: 1}
const b = Object.keys(a).map(key => a[key])
console.log(b)