import AbstractView from '../../framework/view/abstract-view.js';
import createBoardTemplate from './template.js';

export default class BoardView extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
