import createElement from '../../assets/lib/create-element.js';
const CAROUSEL_WRAPPER_CLASS     = ".carousel__inner";
const CAROUSEL_ARROW_LEFT_CLASS  = ".carousel__arrow_left";
const CAROUSEL_ARROW_RIGHT_CLASS = ".carousel__arrow_right";

export default class Carousel {
  
  shiftCarousel(shift) {
      let wrapper       = document.querySelector(CAROUSEL_WRAPPER_CLASS);
  
      let shiftCurrEl   = shift;
      let transformText = wrapper.style.transform;
      transformText = transformText == "" ? "0" : transformText;
      let oldShift      = transformText.match(/-?(\d+)/g);
      oldShift      = Number(oldShift[0]);
      shiftCurrEl  += oldShift;
      wrapper.style.transform = `translateX(${shiftCurrEl}px)`;
  
  }
  
  constructor(slides) {

    let carouselHtml = "";
    let leftArrow = document.createElement("div");
    leftArrow.classList.add('carousel__arrow');
    leftArrow.classList.add('carousel__arrow_left');
    leftArrow.innerHTML = `<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">`;
    leftArrow.onclick = this.leftArrowClick;
    leftArrow.shiftCarousel = this.shiftCarousel;
    leftArrow.style.display = 'none';

    let rightArrow = document.createElement("div");
    rightArrow.classList.add('carousel__arrow');
    rightArrow.classList.add('carousel__arrow_right');
    rightArrow.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    rightArrow.onclick = this.rightArrowClick;
    rightArrow.shiftCarousel = this.shiftCarousel;

    let number = 1;
    slides.forEach( ({name = '', price =0, image ='', id = ''})=> carouselHtml += `<div data-number=${number++} class="carousel__slide" data-id="penang-shrimp">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price.toFixed(2)}</span>
        <div class="carousel__title">${name}</div>
        <button data-id=${id} type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
      </div>`);
    let carousel = document.createElement("div");
    carousel.innerHTML = carouselHtml;
    carousel.classList.add(CAROUSEL_WRAPPER_CLASS.replace('.', ''));
    carousel.carouselLength = slides.length;
    carousel.currentNumber = 1;

    let buttons = carousel.getElementsByTagName("button");
    Array.from(buttons).forEach( (button)=> button.onclick = this.generateCustomEvent );    

    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.append(rightArrow);
    this.elem.append(leftArrow);
    this.elem.append(carousel);
  }

  rightArrowClick() {
    const wrapper = document.querySelector(CAROUSEL_WRAPPER_CLASS);
    const leftArrow = document.querySelector(CAROUSEL_ARROW_LEFT_CLASS);
    this.carouselLength = wrapper.childElementCount;
    const carouselWidth  = wrapper.offsetWidth;
    wrapper.currentNumber += 1;
    if(wrapper.currentNumber <= this.carouselLength) {
      leftArrow.style.display = '';
      this.shiftCarousel(-carouselWidth);
      
    }
    if(wrapper.currentNumber == this.carouselLength)
      this.style.display = 'none';

  }

  leftArrowClick() {
    const wrapper = document.querySelector(CAROUSEL_WRAPPER_CLASS);
    const rightArrow = document.querySelector(CAROUSEL_ARROW_RIGHT_CLASS);
    this.carouselLength = wrapper.childElementCount;
    const carouselWidth  = wrapper.offsetWidth;
    wrapper.currentNumber -= 1;
    if(wrapper.currentNumber >= 1) {
      rightArrow.style.display = '';
      this.shiftCarousel(carouselWidth);
    }
    if(wrapper.currentNumber == 1) 
      this.style.display = 'none';
  }

  generateCustomEvent() {
    let newCustomEvent = new CustomEvent("product-add", {
      detail: this.dataset.id,
      bubbles: true
    });
    this.dispatchEvent(newCustomEvent);
  }

}
