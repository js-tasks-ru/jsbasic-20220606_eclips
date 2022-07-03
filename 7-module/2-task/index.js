import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  
  elem;
  title;
  body;

  constructor() {
    this.close = this.close.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.open      = this.open.bind(this);
  }

  open() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const overlay = document.createElement('div');
    overlay.classList.add('modal__overlay');
    modal.append(overlay);

    const inner = document.createElement('div');
    inner.classList.add('modal__inner');
    modal.append(inner);

    const header = document.createElement('div');
    header.classList.add('modal__header');
    inner.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('modal__body');
    body.appendChild(this.body);
    inner.appendChild(body);

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('modal__close');
    button.onclick = this.close;
    header.appendChild(button);

    const btnImg = document.createElement('img');
    btnImg.setAttribute('src', `/assets/images/icons/cross-icon.svg`);
    btnImg.setAttribute('alt', `close-icon`);
    button.appendChild(btnImg);

    const titleNode = document.createElement('h3');
    titleNode.classList.add('modal__title');
    titleNode.innerText = this.title;
    header.appendChild(titleNode);

    this.elem = modal;

    document.body.classList.add('is-modal-open');
    Array.from(document.getElementsByClassName('container')).forEach( (container) => container.appendChild(modal));

    document.onkeydown = this.onkeydown;
    document.onkeydown.bind = this;
  }

  setTitle(title = ''){
    Array.from(document.getElementsByClassName("modal__title")).forEach( (modal)=> modal.innerHTML = title );
    this.title = title;
    // const titleNode = document.getElementsByClassName('modal__title');
    // Array.from(titleNode).forEach( (node)=> node.innerHTML = title );
  }

  setBody(node) {
    this.body = node;

    // const nodeWrapper = document.createElement('b');
    // nodeWrapper.appendChild(node);

    // const bodies = document.getElementsByClassName('modal__body');
    // Array.from(bodies).forEach( (body)=> body.remove());
    // Array.from(bodies).forEach( (body)=>  body.appendChild(nodeWrapper));
    //modalBody.innerHTML = `<b>тут содержится тело модального окна<b/>`
  }

  onkeydown() {
    if(event === undefined) {
      return;
    }
    if(event.code === 'Escape') {
      this.close();
    }
  }

  close() {
    document.body.classList.remove('is-modal-open');
    const modals = document.getElementsByClassName("modal");
    Array.from(modals).forEach( (modal)=> modal.parentNode.removeChild(modal));
  }

}
