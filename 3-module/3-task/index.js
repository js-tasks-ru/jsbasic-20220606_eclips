let fs = require("fs")
let vm = require('vm')
vm.runInThisContext(fs.readFileSync(__dirname + "/../../1-module/3-task/index.js"))

function camelize(str) {
  let arr = str.split("-");
  let camelized = arr.shift() + arr.map(ucFirst).reduce( (a,b)=> a + b, "");
  return camelized;
}
