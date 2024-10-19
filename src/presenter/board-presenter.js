import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORTING_TYPE,
  LoaderMessages,
  LoaderStatus,
  SortingType,
  TimeLimit,
  UpdateType,
  UserAction,
} from '../const';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { filterBy } from '../utils/filter';
import {
  compareByDate,
  compareByDuration,
  compareByPrice,
} from '../utils/utils';
import BoardView from '../view/board-view/board-view';
import LoaderMessageView from '../view/loader-message-view/loader-message-view';
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
  #loadingComponent = new LoaderMessageView(
    LoaderMessages[LoaderStatus.LOADING]
  );

  #failureComponent = new LoaderMessageView(
    LoaderMessages[LoaderStatus.FAILURE]
  );

  #tripModel = null;
  #filterModel = null;

  #currentFilterType = null;
  #currentSortingType = DEFAULT_SORTING_TYPE;
  #isLoading = true;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #handleNewPointDestroy = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({ boardContainer, tripModel, filterModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;
    this.#handleNewPointDestroy = onNewPointDestroy;

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

    if (this.#isEmptyPoints()) {
      if (this.#noPointsComponent) {
        remove(this.#noPointsComponent);
      }
      this.#renderPointList();
    }

    this.#newPointPresenter.init();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoaderMessage(LoaderStatus.LOADING);
      return;
    }

    if (this.#isEmptyPoints()) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints(this.points);
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
    remove(this.#loadingComponent);
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

  #renderLoaderMessage(status) {
    switch (status) {
      case LoaderStatus.LOADING:
        render(this.#loadingComponent, this.#boardComponent.element);
        break;
      case LoaderStatus.FAILURE:
        render(this.#failureComponent, this.#boardComponent.element);
        break;
    }
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#currentFilterType,
    });
    render(this.#noPointsComponent, this.#boardComponent.element);
  }

  #renderPointList() {
    if (this.#pointListComponent === null) {
      this.#pointListComponent = new PointListView();
    }
    render(this.#pointListComponent, this.#boardComponent.element);
  }

  #removeLoadingComponent() {
    this.#isLoading = false;
    remove(this.#loadingComponent);
  }

  #isEmptyPoints() {
    return this.points.length === 0;
  }

  #handleViewAction = async ({ actionType, updateType, update }) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#tripModel.updatePoint({ updateType, update });
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#tripModel.addPoint({ updateType, update });
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#tripModel.deletePoint({ updateType, update });
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#removeLoadingComponent();
        this.#newPointPresenter = new NewPointPresenter({
          pointListContainer: this.#pointListComponent.element,
          destinations: this.destinations,
          offers: this.offers,
          onDataChange: this.#handleViewAction,
          onDestroy: this.#handleNewPointCancel,
        });
        this.#renderBoard();
        break;
      case UpdateType.FAILURE:
        this.#removeLoadingComponent();
        remove(this.#noPointsComponent);
        this.#renderLoaderMessage(LoaderStatus.FAILURE);
        break;
    }
  };

  #handleNewPointCancel = () => {
    if (this.#isEmptyPoints()) {
      remove(this.#sortComponent);
      remove(this.#pointListComponent);
      this.#renderNoPoints();
    }
    this.#handleNewPointDestroy();
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
