import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  
  elem;
  title;
  body;

  constructor() {
    this.render();
    this.close = this.close.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.elem.addEventListener('click', (event) => this.close(event));
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', this.onkeydown); // так лучше для тестов

    if (this.elem.querySelector('[autofocus]')) {
      this.elem.querySelector('[autofocus]').focus();
    }
  }

  setTitle(title = ''){
    this.elem.querySelector(".modal__title").textContent = title;
  }

  setBody(node) {
    this.elem.querySelector(".modal__body").innerHTML = '';
    this.elem.querySelector(".modal__body").append(node);
  }

  onClick(event) {
    if(event.target.closest('.modal__close')) {
      event.preventDefault();
      this.close();
    }
  }

  onkeydown(event) {
    if(event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  close() {
    document.body.classList.remove('is-modal-open');
    const modals = document.getElementsByClassName("modal");
    Array.from(modals).forEach( (modal)=> modal.parentNode.removeChild(modal));
  }

}
