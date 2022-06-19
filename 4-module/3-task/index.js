function highlight(table) {
  const statusCellIndex = 3;
  const genderCellIndex = 2;
  const ageCellIndex    = 1;

  Array.from(Array(table.rows.length-1).keys(),n=>n+1).forEach( (rowIndex)=> {
    let tr = table.rows[rowIndex];
    let dataAvailable = tr.cells[statusCellIndex].getAttribute("data-available");
    let genderText    = tr.cells[genderCellIndex].textContent.toLowerCase();
    let ageText       = Number(tr.cells[ageCellIndex].textContent);
    if( dataAvailable == 'true') {
      tr.classList.add('available') ;
    } else if( dataAvailable == 'false') {
      tr.classList.add('unavailable');
    } else if(dataAvailable == null) {
      tr.setAttribute('hidden', '');
    }
    if(genderText == 'm') {
      tr.classList.add('male') ;
    } else if(genderText == 'f') {
      tr.classList.add('female') ;
    }
    if(ageText < 18) {
      tr.style.textDecoration = 'line-through';
    }
  });
}
