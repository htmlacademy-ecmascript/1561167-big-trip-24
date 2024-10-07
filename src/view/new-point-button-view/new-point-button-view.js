import AbstractView from '../../framework/view/abstract-view';
import { createNewPointButtonTemplate } from './template';

export default class NewPointButtonView extends AbstractView {
  #handleNewPointButtonClick = null;

  constructor({ onNewPointButtonClick }) {
    super();
    this.#handleNewPointButtonClick = onNewPointButtonClick;

    this.element.addEventListener('click', this.#newPointClickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #newPointClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointButtonClick();
  };
}
