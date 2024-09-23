import AbstractView from '../../framework/view/abstract-view';
import { createSortTemplate } from './template';

export default class SortView extends AbstractView {
  #currentSortingType = null;
  #handleSortingTypeChanging = null;

  constructor({ currentSortingType, onSortingTypeChanging }) {
    super();
    this.#currentSortingType = currentSortingType;
    this.#handleSortingTypeChanging = onSortingTypeChanging;

    this.element.addEventListener('change', this.#sortingTypeChangingHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortingType);
  }

  #sortingTypeChangingHandler = (evt) => {
    const sortingType = evt.target.dataset.sortingType;

    evt.preventDefault();

    if (!sortingType) {
      return;
    }

    this.#handleSortingTypeChanging(sortingType);
  };
}
