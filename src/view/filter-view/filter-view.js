import AbstractView from '../../framework/view/abstract-view';
import { createFilterTemplate } from './template';

export default class FilterView extends AbstractView {
  #filters = [];

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
