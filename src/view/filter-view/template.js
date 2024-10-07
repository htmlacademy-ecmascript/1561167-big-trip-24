const createFilterItemTemplate = ({ type, count }, isActive) => `
  <div class="trip-filters__filter">
    <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden" type="radio"
      name="trip-filter"
      value="${type}"
      ${isActive ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>
`;

const createFilterTemplate = ({ filters, currentFilterType }) => {
  const filterTemplate = filters
    .map((filter) =>
      createFilterItemTemplate(filter, filter.type === currentFilterType)
    )
    .join('');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export { createFilterTemplate };
