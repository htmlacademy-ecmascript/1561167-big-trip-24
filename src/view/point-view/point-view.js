import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './template.js';

export default class PointView extends AbstractView {
  #point = null;
  #destinations = [];
  #offers = [];

  #handleEditClick = null;

  constructor({ point, destinations, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
