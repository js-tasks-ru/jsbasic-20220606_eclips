function makeDiagonalRed(table) {
  [...Array(table.rows.length).keys()].forEach( (index)=> table.rows[index].cells[index].style.backgroundColor = "red");
}
