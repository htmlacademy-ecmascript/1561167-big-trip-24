import { BLANK_POINT } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';
import { createPointEditTemplate } from './template.js';

export default class PointEditView extends AbstractView {
  #point = null;
  #destinations = [];
  #offers = [];
  #isNewPoint = false;

  #handleFormSubmit = null;
  #handleCloseFormClick = null;

  constructor({
    point = BLANK_POINT,
    destinations,
    offers,
    isNewPoint,
    onFormSubmit,
    onCloseFormClick,
  }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint ?? false;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };
}
