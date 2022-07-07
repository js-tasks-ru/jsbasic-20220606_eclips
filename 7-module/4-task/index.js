import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem;
  #thumb;
  #progress;
  #value;
  #currentStep;
  #count;

  constructor({ steps, value = 0 }) {
    this.onmousedown = this.onmousedown.bind(this);
    this.onmouseup   = this.onmouseup.bind(this);
    this.onmousemove = this.onmousemove.bind(this);

    this.render(steps);
    this.#thumb   = this.elem.querySelector('.slider__thumb');
    this.#value   = this.elem.querySelector('.slider__value');
    this.#progress= this.elem.querySelector('.slider__progress');
    this.#count   = steps-1;
    this.#thumb.ondragstart = () => false;
    this.renderSliderPosition(value * (100 / this.#count), value);
    this.elem.addEventListener('pointerdown', this.onmousedown);

    document.addEventListener('pointerup'  , this.onmouseup);


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
    this.onmouseup(event);
  }

  onmousedown(event) {
    this.onmousemove(event);
    this.elem.addEventListener('pointermove', this.onmousemove);
    this.elem.classList.add('slider_dragging');
  }

  onmouseup(event) {
    this.elem.removeEventListener('pointermove', this.onmousemove);
    this.elem.classList.remove('slider_dragging');
    const customEvent = new CustomEvent('slider-change', {
      detail: this.#currentStep,
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);
  }

  onmousemove(event) {
    const clientRect = this.elem.getBoundingClientRect();
    let shiftX     = event.clientX - clientRect.left;
    shiftX = shiftX < 0 ? 0 : shiftX;
    shiftX = shiftX > clientRect.width ? clientRect.width : shiftX;
    const percentX    = (shiftX / clientRect.width) * 100;
    const oneStep        = 100 / this.#count;
    const closestStep    = Math.round(percentX / oneStep);
    this.#currentStep  = closestStep;
    let percentXrounded    = closestStep * oneStep;

    this.renderSliderPosition(percentXrounded, closestStep);
  }

  renderSliderPosition(percentXrounded, step) {
    this.#thumb.style.left = percentXrounded + "%";
    this.#progress.style.width = percentXrounded + "%";
    this.#value.innerHTML = step;
  }



}
