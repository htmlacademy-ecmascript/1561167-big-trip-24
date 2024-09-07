import { FilterType } from '../const';
import { createElement } from '../render';

const createFilterItemTemplate = (filter, isActive) => `
  <div class="trip-filters__filter">
    <input id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden" type="radio"
      name="trip-filter"
      value="${filter} "${isActive ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
`;

const createFilterTemplate = () => {
  const filterTemplate = Object.values(FilterType)
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterView {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
