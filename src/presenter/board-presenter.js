import { render } from '../framework/render';
import BoardView from '../view/board-view';
import PointEditView from '../view/point-edit-view';
import PointListView from '../view/point-list-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';

export default class BoardPresenter {
  #boardContainer = null;
  #tripModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new PointListView();

  #boardPoints = [];
  #offers = [];
  #destinations = [];

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#boardPoints = [...this.#tripModel.points];
    this.#offers = this.#tripModel.offers;
    this.#destinations = this.#tripModel.destinations;

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);

    render(this.#pointListComponent, this.#boardComponent.element);

    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointComponent = new PointEditView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
    render(pointComponent, this.#pointListComponent.element);
  }
}
