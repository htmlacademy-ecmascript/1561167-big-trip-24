import { render, replace } from '../framework/render';
import BoardView from '../view/board-view/board-view';
import PointEditView from '../view/point-edit-view/point-edit-view';
import PointListView from '../view/point-list-view/point-list-view';
import PointView from '../view/point-view/point-view';
import SortView from '../view/sort-view/sort-view';

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

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);

    render(this.#pointListComponent, this.#boardComponent.element);

    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const escapeKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escapeKeyDownHandler);
      },
    });
    const pointEditComponent = new PointEditView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
