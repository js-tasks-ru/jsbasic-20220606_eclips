import createElement from '../../assets/lib/create-element.js';

const SLIDER_STEP_ACTIVE = 'slider__step-active';
const SLIDER_CHANGE_EVENT = 'slider-change';
const SLIDER_DRAGGING_EVENT = 'slider_dragging';

export default class StepSlider {

  elem;
  #thumb;
  #progress;
  #value;
  #currentStep;
  #segments;
  #steps;

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  constructor({ steps, value = 0 }) {
    this.#steps      = steps;
    this.#segments   = steps-1;
    this.render = this.render.bind(this);
    this.render();
    this.#thumb   = this.sub('thumb');
    this.#value   = this.sub('value');
    this.#progress= this.sub('progress');

    this.addEventListeners();
    this.setValue(value);
  }

  render() {
    this.elem = createElement(`<div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
  
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
      </div>
  </div>`);
  const sliderSteps = this.sub('steps');
  [...Array(this.#steps).keys()].forEach( (index) => sliderSteps.appendChild(createElement(`<span></span>`)) );
  sliderSteps.children[0].classList.add(SLIDER_STEP_ACTIVE);
  }

  addEventListeners() {
    this.#thumb.ondragstart = () => false;
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup   = this.onpointerup.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onclick       = this.onclick.bind(this);
    this.setValue      = this.setValue.bind(this);

    this.#thumb.onpointerdown = this.onpointerdown;
    this.elem.onclick         = this.onclick;
  }

  createNewEvent(detail) {
    return new CustomEvent(SLIDER_CHANGE_EVENT, {
      detail: detail,
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
  }

  onclick(event) {
    let newStep = this.calcNewStep(event);
    this.setValue(Math.round(this.#segments * newStep));

    const customEvent = this.createNewEvent(this.#currentStep);
    this.elem.dispatchEvent(customEvent);
  }

  onpointerdown(event) {
    event.preventDefault();
    this.elem.classList.add(SLIDER_DRAGGING_EVENT);
    document.addEventListener('pointermove', this.onpointermove);
    document.addEventListener('pointerup'  , this.onpointerup);
  }

  onpointerup(event) {
    document.removeEventListener('pointermove', this.onpointermove);
    document.removeEventListener('pointerup', this.onpointerup);
    this.elem.classList.remove(SLIDER_DRAGGING_EVENT);

    const customEvent = this.createNewEvent(this.#currentStep);
    this.elem.dispatchEvent(customEvent);
  }

  onpointermove(event) {
    event.preventDefault();
    let newStep = this.calcNewStep(event);
    this.#currentStep = Math.round(this.#segments * newStep);
    let percentX = newStep * 100;
    this.renderProgressBar(percentX, this.#currentStep);
  }

  setValue(value) {
    this.#currentStep  = value;
    let percentX = (value / this.#segments) * 100;
    const stepActive = this.sub('step-active');
    if(stepActive) {
      stepActive.classList.remove(SLIDER_STEP_ACTIVE);
    }
    const steps = this.sub('steps');
    steps.children[Math.min(value, this.#steps)].classList.add(SLIDER_STEP_ACTIVE);

    this.renderProgressBar(percentX, value);
  }

  calcNewStep(event) {
    let newStep = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    if (newStep < 0) { newStep = 0; }
    if (newStep > 1) { newStep = 1; }
    return newStep;
  }

  renderProgressBar(percentX, value) {
    this.#thumb.style.left = percentX + "%";
    this.#progress.style.width = percentX + "%";
    this.#value.innerHTML = value;
  }
  
}
