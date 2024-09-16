import AbstractView from '../../framework/view/abstract-view';
import { createNoPointsTemplate } from './tempate';

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
