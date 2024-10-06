import { FilterType, UpdateType } from '../const';
import { remove, render, replace } from '../framework/render';
import { filterBy } from '../utils/filter';
import FilterView from '../view/filter-view/filter-view';

export default class FilterPresenter {
  #filterContainer = null;

  #filterModel = null;
  #tripModel = null;

  #filterComponent = null;

  constructor({ filterContainer, filterModel, tripModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#tripModel.points;
    const filters = Object.values(FilterType).map((filterType) => ({
      type: filterType,
      count: filterBy[filterType](points).length,
    }));

    return filters;
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onfilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter({
      updateType: UpdateType.MAJOR,
      filter: filterType,
    });
  };
}
