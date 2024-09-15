import AbstractView from '../../framework/view/abstract-view.js';
import createPointListTemplate from './template.js';

export default class PointListView extends AbstractView {
  get template() {
    return createPointListTemplate();
  }
}
