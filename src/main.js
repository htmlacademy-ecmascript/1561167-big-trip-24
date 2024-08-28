import { render } from './render';
import FilterView from './view/filter-view';
import NewPointButtonView from './view/new-point-button-view';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = pageHeaderElement.querySelector(
  '.trip-controls__filters'
);

render(new NewPointButtonView(), tripMainElement);
render(new FilterView(), tripControlsFiltersElement);
