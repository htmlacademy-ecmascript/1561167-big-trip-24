import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import { render } from './framework/render';
import NewPointButtonView from './view/new-point-button-view/new-point-button-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import { AUTHORIZATION, END_POINT } from './const';
import TripApiService from './trip-api-service';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = pageHeaderElement.querySelector(
  '.trip-controls__filters'
);

const pageMainElement = document.querySelector('.page-main');
const pageBodyContainerElement = pageMainElement.querySelector(
  '.page-body__container'
);

const tripModel = new TripModel({
  tripApiService: new TripApiService(END_POINT, AUTHORIZATION),
});
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
  onNewPointDestroy: handleNewPointFormClose,
});
const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  toggleNewPointButton();
}

function handleNewPointButtonClick() {
  boardPresenter.createNewPoint();
  toggleNewPointButton(true);
}

function toggleNewPointButton(isDisabled = false) {
  newPointButtonComponent.element.toggleAttribute('disabled', isDisabled);
}

render(newPointButtonComponent, tripMainElement);

filterPresenter.init();
boardPresenter.init();
tripModel.init().finally(() => toggleNewPointButton());
