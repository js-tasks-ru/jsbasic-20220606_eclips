var el = document.createElement('script');
el.async = false;
el.src = "/../../1-module/3-task/index.js";
el.type = 'text/javascript';


function camelize(str) {
  let arr = str.split("-");
  let camelized = arr.shift() + arr.map(ucFirst).reduce( (a,b)=> a + b, "");
  return camelized;
}
