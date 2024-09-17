import {
  ACCEPTABLE_SORTING,
  DEFAULT_SORTING_TYPE,
  SortType,
} from '../../const';

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
    .map((sort) => createSortItemTemplate(sort, sort === DEFAULT_SORTING_TYPE))
    .join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>
  `;
};

export { createSortTemplate };
