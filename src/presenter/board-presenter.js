import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORTING_TYPE,
  SortingType,
  UpdateType,
  UserAction,
} from '../const';
import { remove, render } from '../framework/render';
import { filterBy } from '../utils/filter';
import {
  compareByDate,
  compareByDuration,
  compareByPrice,
} from '../utils/utils';
import BoardView from '../view/board-view/board-view';
import NoPointsView from '../view/no-points-view/no-points-view';
import PointListView from '../view/point-list-view/point-list-view';
import SortView from '../view/sort-view/sort-view';
import NewPointPresenter from './new-point-presenter';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;

  #boardComponent = new BoardView();
  #pointListComponent = new PointListView();
  #noPointsComponent = null;
  #sortComponent = null;

  #tripModel = null;
  #filterModel = null;

  #currentFilterType = null;
  #currentSortingType = DEFAULT_SORTING_TYPE;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({ boardContainer, tripModel, filterModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const points = this.#tripModel.points;
    const filteredPoints = filterBy[this.#currentFilterType](points);

    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return filteredPoints.sort(compareByDuration);
      case SortingType.PRICE:
        return filteredPoints.sort(compareByPrice);
    }

    return filteredPoints.sort(compareByDate);
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

  createNewPoint() {
    this.#currentSortingType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(this.points);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#currentFilterType,
    });
    render(this.#noPointsComponent, this.#boardComponent.element);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortingType: this.#currentSortingType,
      onSortingTypeChange: this.#handleSortingTypeChange,
    });
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #clearBoard(resetSortingType = false) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortingType) {
      this.#currentSortingType = DEFAULT_SORTING_TYPE;
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

  #handleModelEvent = (updateType, data) => {
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
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetViewingMode());
  };

  #handleSortingTypeChange = (sortingType) => {
    if (sortingType === this.#currentSortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
