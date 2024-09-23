import { SortingType } from '../../const';
import { isAllowedSortingType } from '../../utils/utils';

const createSortItemTemplate = (sort, isActive) => `
  <div class="trip-sort__item  trip-sort__item--${sort}">
    <input id="sort-${sort}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sort}"
      data-sorting-type="${sort}"
      ${isActive ? 'checked' : ''}
      ${isAllowedSortingType(sort) ? '' : 'disabled'}>
    <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
  </div>
`;

const createSortTemplate = (currentSortingType) => {
  const sortTemplate = Object.values(SortingType)
    .map((sort) => createSortItemTemplate(sort, currentSortingType === sort))
    .join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>
  `;
};

export { createSortTemplate };
