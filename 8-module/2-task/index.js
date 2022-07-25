import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

const PRODUCT_GRID_INNER = '.products-grid__inner';
const CARD_TITLE         = '.card__title';
const CARD               = '.card';

export default class ProductGrid {

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
    </div>
  </div>    
    `);
    this.products.forEach( product => {
      const newProduct = new ProductCard(product);
      this.elem.querySelector(PRODUCT_GRID_INNER).appendChild(newProduct.elem);
    });
  }

  updateFilter(filters) {
    if(this.filter == undefined) {
      this.filter = {};
    }
    Object.entries(filters).forEach(filter => this.filter[filter[0]] = filter[1]);
    const filtered = [];
    this.products.filter(product => !this.checkProduct(product)).forEach( (item) => {
      filtered.push(item.name);
    } );
    this.delete(filtered);
  }

  checkProduct(product) {
    let checkResult = true;
    if(this.filter?.noNuts == true && product['nuts'] == true) {
      checkResult = false;
    }    
    if(this.filter?.vegeterianOnly == true && (product['vegeterian'] == false || product['vegeterian'] == undefined)) {
      checkResult = false;
    }    
    if(typeof this.filter?.maxSpiciness == 'number' && (product['spiciness'] > this.filter.maxSpiciness && this.filter.maxSpiciness <= 4)) {
      checkResult = false;
    }    
    if(typeof this.filter?.category == 'string' && product['category'] != this.filter?.category && this.filter?.category != '') {
      checkResult = false;
    }    
    return checkResult;
  }

  delete(productNames) {
    const inner = this.elem.querySelector(PRODUCT_GRID_INNER);
    const cards = document.querySelectorAll(CARD);
    [...cards]
    .filter((productCard) => {
      let cardTitleElement = productCard.querySelector(CARD_TITLE);

      cardTitleElement = cardTitleElement && cardTitleElement.textContent.trim();
      return productNames.indexOf(cardTitleElement) != -1;
    })
    .forEach(productCard => inner.removeChild(productCard));
  }

}
