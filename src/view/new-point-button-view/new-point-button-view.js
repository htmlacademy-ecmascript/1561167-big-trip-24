import AbstractView from '../../framework/view/abstract-view';
import createNewPointButtonTemplate from './template';

export default class NewPointButtonView extends AbstractView {
  get template() {
    return createNewPointButtonTemplate();
  }
}
