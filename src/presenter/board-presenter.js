import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORTING_TYPE,
  SortingType,
} from '../const';
import { render } from '../framework/render';
import { updateItem } from '../utils/common';
import {
  compareByDate,
  compareByDuration,
  compareByPrice,
} from '../utils/utils';
import BoardView from '../view/board-view/board-view';
import NoPointsView from '../view/no-points-view/no-points-view';
import PointListView from '../view/point-list-view/point-list-view';
import SortView from '../view/sort-view/sort-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;

  #boardComponent = new BoardView();
  #pointListComponent = new PointListView();
  #noPointsComponent = null;
  #sortComponent = null;

  #tripModel = null;
  #boardPoints = [];
  #sourcedBoardPoints = [];
  #offers = [];
  #destinations = [];

  #filterType = DEFAULT_FILTER_TYPE;
  #currentSortigType = DEFAULT_SORTING_TYPE;

  #pointPresenters = new Map();

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#boardPoints = [...this.#tripModel.points].sort(compareByDate);
    this.#sourcedBoardPoints = [...this.#boardPoints];
    this.#offers = this.#tripModel.offers;
    this.#destinations = this.#tripModel.destinations;

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      this.#renderNoPoints({ filterType: this.#filterType });
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType,
    });
    render(this.#noPointsComponent, this.#boardComponent.element);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortingType: this.#currentSortigType,
      onSortingTypeChanging: this.#handleSortingTypeChanging,
    });
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(this.#boardPoints);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onDateChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortingType) {
    switch (sortingType) {
      case SortingType.TIME:
        this.#boardPoints.sort(compareByDuration);
        break;
      case SortingType.PRICE:
        this.#boardPoints.sort(compareByPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortigType = sortingType;
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(
      this.#sourcedBoardPoints,
      updatedPoint
    );
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetViewingMode());
  };

  #handleSortingTypeChanging = (sortingType) => {
    if (sortingType === this.#currentSortigType) {
      return;
    }

    this.#sortPoints(sortingType);
    this.#clearPointList();
    this.#renderPointList();
  };
}
