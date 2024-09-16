import TripModel from './model/trip-model';
import BoardPresenter from './presenter/board-presenter';
import { render } from './framework/render';
import NewPointButtonView from './view/new-point-button-view/new-point-button-view';
import FilterView from './view/filter-view/filter-view';
import { generateFilter } from './mock/filter';

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
const boardPresenter = new BoardPresenter({
  boardContainer: pageBodyContainerElement,
  tripModel,
});
const filters = generateFilter(tripModel.points);

render(new NewPointButtonView(), tripMainElement);
render(new FilterView({ filters }), tripControlsFiltersElement);

boardPresenter.init();
