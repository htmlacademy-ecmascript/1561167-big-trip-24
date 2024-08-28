import { render } from './render';
import NewPointButtonView from './view/new-point-button-view';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');

render(new NewPointButtonView(), tripMainElement);
