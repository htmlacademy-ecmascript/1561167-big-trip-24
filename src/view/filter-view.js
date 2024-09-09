import { DEFAULT_FILTER_TYPE, FilterType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, isActive) => `
  <div class="trip-filters__filter">
    <input id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden" type="radio"
      name="trip-filter"
      value="${filter}
      "${isActive ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>
`;

const createFilterTemplate = () => {
  const filterTemplate = Object.values(FilterType)
    .map((filter) =>
      createFilterItemTemplate(filter, filter === DEFAULT_FILTER_TYPE)
    )
    .join('');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
