import AbstractView from '../../framework/view/abstract-view';
import { createInfoTemplate } from './template';

export default class InfoView extends AbstractView {
  #title = '';
  #startDate = '';
  #endDate = '';
  #costValue = 0;

  constructor({ title, startDate, endDate, costValue }) {
    super();
    this.#title = title;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#costValue = costValue;
  }

  get template() {
    return createInfoTemplate({
      title: this.#title,
      startDate: this.#startDate,
      endDate: this.#endDate,
      costValue: this.#costValue,
    });
  }
}
