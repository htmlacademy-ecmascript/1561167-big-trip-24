import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import { render } from './framework/render';
import NewPointButtonView from './view/new-point-button-view/new-point-button-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = pageHeaderElement.querySelector(
  '.trip-controls__filters'
);

const pageMainElement = document.querySelector('.page-main');
const pageBodyContainerElement = pageMainElement.querySelector(
  '.page-body__container'
);

const tripModel = new TripModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  tripModel,
});
const boardPresenter = new BoardPresenter({
  boardContainer: pageBodyContainerElement,
  tripModel,
  filterModel,
});

render(new NewPointButtonView(), tripMainElement);

filterPresenter.init();
boardPresenter.init();
