import { createElement } from '../render.js';

const createBoardTemplate = () => `
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->

    <!-- Контент -->
  </section>
`;

export default class BoardView {
  getTemplate = () => createBoardTemplate();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  };

  removeElement = () => (this.element = null);
}
