import AbstractView from '../../framework/view/abstract-view';
import { createSortTemplate } from './template';

export default class SortView extends AbstractView {
  #currentSortingType = null;
  #handleSortingTypeChange = null;

  constructor({ currentSortingType, onSortingTypeChange }) {
    super();
    this.#currentSortingType = currentSortingType;
    this.#handleSortingTypeChange = onSortingTypeChange;

    this.element.addEventListener('change', this.#sortingTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortingType);
  }

  #sortingTypeChangeHandler = (evt) => {
    const sortingType = evt.target.dataset.sortingType;

    evt.preventDefault();

    if (!sortingType) {
      return;
    }

    this.#handleSortingTypeChange(sortingType);
  };
}
