import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORTING_TYPE,
  SortingType,
  UpdateType,
  UserAction,
} from '../const';
import { remove, render } from '../framework/render';
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

  #filterType = DEFAULT_FILTER_TYPE;
  currentSortingType = DEFAULT_SORTING_TYPE;

  #pointPresenters = new Map();

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.currentSortingType) {
      case SortingType.TIME:
        return [...this.#tripModel.points].sort(compareByDuration);
      case SortingType.PRICE:
        return [...this.#tripModel.points].sort(compareByPrice);
    }
    return [...this.#tripModel.points].sort(compareByDate);
  }

  get offers() {
    return this.#tripModel.offers;
  }

  get destinations() {
    return this.#tripModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.points.length) {
      this.#renderNoPoints({ filterType: this.#filterType });
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(this.points);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType,
    });
    render(this.#noPointsComponent, this.#boardComponent.element);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortingType: this.currentSortingType,
      onSortingTypeChange: this.#handleSortingTypeChange,
    });
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #clearBoard(resetSortingType = false) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortingType) {
      this.currentSortingType = DEFAULT_SORTING_TYPE;
    }
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = ({ actionType, updateType, update }) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripModel.updatePoint({ updateType, update });
        break;
      case UserAction.ADD_POINT:
        this.#tripModel.addPoint({ updateType, update });
        break;
      case UserAction.DELETE_POINT:
        this.#tripModel.deletePoint({ updateType, update });
        break;
    }
  };

  #handleModelEvent = ({ updateType, update: data }) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetViewingMode());
  };

  #handleSortingTypeChange = (sortingType) => {
    if (sortingType === this.currentSortingType) {
      return;
    }

    this.currentSortingType = sortingType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
