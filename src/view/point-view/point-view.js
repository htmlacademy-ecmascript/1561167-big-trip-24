import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './template.js';

export default class PointView extends AbstractView {
  #point = null;
  #destinations = [];
  #offers = [];

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
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

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();

    const favoriteButtonElement = evt.target.closest('.event__favorite-btn');
    favoriteButtonElement.toggleAttribute('disabled', true);
    this.#handleFavoriteClick();
  };
}
