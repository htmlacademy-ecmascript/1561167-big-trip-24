import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import { render } from './framework/render';
import NewPointButtonView from './view/new-point-button-view/new-point-button-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import { AUTHORIZATION, END_POINT } from './const';
import TripApiService from './trip-api-service';
import { toggleButtonAttribute } from './utils/utils';

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
  infoContainer: tripMainElement,
  boardContainer: pageBodyContainerElement,
  tripModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  toggleButtonAttribute({ buttonElement: newPointButtonComponent.element });
}

function handleNewPointButtonClick() {
  boardPresenter.createNewPoint();
  toggleButtonAttribute({
    buttonElement: newPointButtonComponent.element,
    isDisabled: true,
  });
}

render(newPointButtonComponent, tripMainElement);

filterPresenter.init();
boardPresenter.init();
tripModel.init().finally(() => {
  if (tripModel.isFailure) {
    return;
  }

  toggleButtonAttribute({ buttonElement: newPointButtonComponent.element });
});
