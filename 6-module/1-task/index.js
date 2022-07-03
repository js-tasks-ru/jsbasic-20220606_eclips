/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  table;
  tHead;
  tBody;
  translator = { name : "Имя", age : "Возвраст", salary : "Зарплата", city : "Город"};
  
  constructor(rows) {
    let translator = this.translator;
    this.table   = document.createElement('table');
    this.tHead   = this.table.createTHead();
    if(rows.length == 0) {
      return;
    }
    //create header
    this.initHeader(rows[0]);

    //fill the table
    Object.values(rows).forEach( (row) => {
      this.appendRow(row);
    });
    this.elem = this.table;
  }

  clearHeader() {
    Array.from(this.tHead.rows).forEach( (row) => row.remove());
  }

  initHeader(row) {
    let theadTr = this.tHead.insertRow(0);
    Object.keys(row).forEach( (key) => theadTr.insertCell(theadTr.length).innerHTML = this.translator[key] ? this.translator[key] : key );
    theadTr.insertCell(theadTr.length).innerHTML = ""; //for button
    this.tBody = this.table.createTBody();
  }

  appendRow(row) {
    let newRow = this.tBody.insertRow(this.tBody.rows.length);
    Object.values(row).forEach( (cell) => {
      newRow.insertCell(newRow.cells.length).innerHTML = cell;
    } );
    let cellBtn = newRow.insertCell(newRow.cells.length);
    let btn     = cellBtn.appendChild(document.createElement("button"));
    btn.textContent = "X";
    btn.onclick = this.deleteRow;
  } 

  deleteRow() {
    this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex-1);
  }

}
