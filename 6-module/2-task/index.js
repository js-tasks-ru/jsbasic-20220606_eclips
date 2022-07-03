import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  table;

  constructor({name = '', price = 0, category = '', image = '', id = ''}) {

    this.table = createElement(`
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">€${price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${name}</div>
        <button data-id=${id} type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>    
    `);

    let buttons = this.table.getElementsByTagName("button");
    Array.from(buttons).forEach( (button)=> button.onclick = this.generateCustomEvent );

    this.elem = this.table;

  }

  generateCustomEvent() {
    let newCustomEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: this.dataset.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });
    this.dispatchEvent(newCustomEvent);

  }

}