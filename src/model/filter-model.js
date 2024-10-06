import { DEFAULT_FILTER_TYPE } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #filterType = DEFAULT_FILTER_TYPE;

  get filter() {
    return this.#filterType;
  }

  setFilter({ updateType, filter }) {
    this.#filterType = filter;
    this._notify(updateType, filter);
  }
}
