import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem;
  #thumb;
  #progress;
  #value;
  #count;

  constructor({ steps, value = 0 }) {
    this.onmousedown = this.onmousedown.bind(this);
    this.onmouseup   = this.onmouseup.bind(this);
    this.onclick     = this.onclick.bind(this);

    this.render(steps);
    this.#thumb   = this.elem.querySelector('.slider__thumb');
    this.#value   = this.elem.querySelector('.slider__value');
    this.#progress= this.elem.querySelector('.slider__progress');
    this.#count   = steps-1;
    this.renderSliderPosition(value * (100 / this.#count), value);
    this.elem.addEventListener('mousedown', this.onmousedown);
    document.addEventListener('click', this.onclick);
    document.addEventListener('mouseup'  , this.onmouseup);


  }

  render(steps) {
    this.elem = createElement(`<div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
  
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
        <span class="slider__step-active"></span>
      </div>
  </div>`);
  const sliderSteps = this.elem.querySelector('.slider__steps');
  [...Array(steps-1).keys()].forEach( (index) => sliderSteps.appendChild(createElement(`<span></span>`)) );
  }

  onclick(event) { //for tests
    this.onmousemove(event);
  }

  onmousedown(event) {
    this.onmousemove(event);
    this.onmousemove = this.onmousemove.bind(this);
    this.elem.addEventListener('mousemove', this.onmousemove);
  }

  onmouseup(event) {
    this.elem.removeEventListener('mousemove', this.onmousemove);
  }

  onmousemove(event) {
    const clientRect = this.elem.getBoundingClientRect();
    let shiftX     = event.clientX - clientRect.left;
    shiftX = shiftX < 0 ? 0 : shiftX;
    shiftX = shiftX > clientRect.width ? clientRect.width : shiftX;
    let percentX    = (shiftX / clientRect.width) * 100;
    let oneStep        = 100 / this.#count;
    let closestStep    = Math.round(percentX / oneStep);
    let percentXrounded    = closestStep * oneStep;

    this.renderSliderPosition(percentXrounded, closestStep);

    const customEvent = new CustomEvent('slider-change', {
      detail: closestStep,
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);

  }

  renderSliderPosition(percentXrounded, step) {
    this.#thumb.style.left = percentXrounded + "%";
    this.#progress.style.width = percentXrounded + "%";
    this.#value.innerHTML = step;
  }



}
