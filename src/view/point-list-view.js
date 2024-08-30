import { createElement } from '../render.js';

const createPointListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointListView {
  getTemplate = () => createPointListTemplate();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  };

  removeElement = () => (this.element = null);
}
