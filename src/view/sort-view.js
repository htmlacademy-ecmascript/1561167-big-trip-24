import { ACCEPTABLE_SORTING, SortType } from '../const';
import { createElement } from '../render';

const createSortItemTemplate = (sort, isActive) => `
  <div class="trip-sort__item  trip-sort__item--${sort}">
    <input id="sort-${sort}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sort}"
      ${isActive ? 'checked' : ''}
      ${!ACCEPTABLE_SORTING.includes(sort) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
  </div>
`;

const createSortTemplate = () => {
  const sortTemplate = Object.values(SortType)
    .map((sort, index) => createSortItemTemplate(sort, index === 0))
    .join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>
  `;
};

export default class SortView {
  getTemplate = () => createSortTemplate();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  };

  removeElement = () => (this.element = null);
}
