import createElement from '../../assets/lib/create-element.js';
import categories from './categories.js';

const RIBBON = 'ribbon';
const RIBBON_NAV = 'ribbon__inner';
const RIBBON_ARROW = 'ribbon__arrow';
const RIBBON_ARROW_LEFT  = 'ribbon__arrow_left';
const RIBBON_ARROW_RIGHT = 'ribbon__arrow_right';
const RIBBON_ARROW_IMG       = "/assets/images/icons/angle-icon.svg";
const RIBBON_ARROW_IMG_ALT   = "icon";
const RIBBON_ARROW_VISIBLE   = 'ribbon__arrow_visible';
const RIBBON_ITEM_ACTIVE     = 'ribbon__item_active';
const RIBBON_ITEM            = 'ribbon__item';
const RIBBON_CLICK_EVENT     = 'ribbon-select';

export default class RibbonMenu {
  constructor(categories) {

    const ribbon = document.createElement('div');
    ribbon.classList.add(RIBBON);
    const buttonLeft = document.createElement('button');
    buttonLeft.classList.add(RIBBON_ARROW);
    buttonLeft.classList.add(RIBBON_ARROW_LEFT);
    // buttonLeft.classList.add('ribbon__arrow_visible');
    const imgLeft = document.createElement('img');
    imgLeft.setAttribute("src", RIBBON_ARROW_IMG);
    imgLeft.setAttribute("alt", RIBBON_ARROW_IMG_ALT);
    buttonLeft.appendChild(imgLeft);
    
    const buttonRight = document.createElement('button');
    buttonRight.classList.add(RIBBON_ARROW);
    buttonRight.classList.add(RIBBON_ARROW_RIGHT);
    buttonRight.classList.add(RIBBON_ARROW_VISIBLE);
    const imgRight = document.createElement('img');
    imgRight.setAttribute("src", RIBBON_ARROW_IMG);
    imgRight.setAttribute("alt", RIBBON_ARROW_IMG_ALT);
    buttonRight.appendChild(imgRight);
    
    ribbon.append(buttonLeft);

    let ribonElements = [];
    categories.map( ({id = '', name = ''}) => `<a href="#" class="${RIBBON_ITEM}" data-id="${id}">${name}</a>`).forEach( (html)=> ribonElements.push(createElement(html)) );
    ribonElements.forEach( (ribbonItem) => ribbonItem.onclick = function() {
      const preActiveRibbons = document.getElementsByClassName(RIBBON_ITEM_ACTIVE);
      Array.from(preActiveRibbons).forEach( (ribbonItem) => ribbonItem.classList.remove(RIBBON_ITEM_ACTIVE));
      this.classList.add(RIBBON_ITEM_ACTIVE);
      let newCustomEvent = new CustomEvent(RIBBON_CLICK_EVENT, {
        detail: this.dataset.id,
        bubbles: true
      });
      this.dispatchEvent(newCustomEvent);
  
    });
    const ribonNav = document.createElement('nav');
    ribonNav.classList.add(RIBBON_NAV);

    ribonElements.forEach( (node)=> ribonNav.appendChild(node));
    ribbon.append(ribonNav);

    ribbon.append(buttonRight);

    const scrollValue = 350;
    buttonLeft.onclick = function() {
      ribonNav.scrollBy(-scrollValue, 0);
    };
    buttonRight.onclick = function() {
      ribonNav.scrollBy(scrollValue, 0);
    };

    ribonNav.onscroll = function() {
      let scrollLeft = ribonNav.scrollLeft;
      let clientWidth = ribonNav.clientWidth;
      let scrollWidth = ribonNav.scrollWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if(scrollLeft > 1) {
        buttonLeft.classList.add(RIBBON_ARROW_VISIBLE);
      } else {
        buttonLeft.classList.remove(RIBBON_ARROW_VISIBLE);
      }
      if(scrollRight > 1) {
        buttonRight.classList.add(RIBBON_ARROW_VISIBLE);
      } else {
        buttonRight.classList.remove(RIBBON_ARROW_VISIBLE);
      }
    };

    this.elem = ribbon;
    this.categories = categories;
  }



}
